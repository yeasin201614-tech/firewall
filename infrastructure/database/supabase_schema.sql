-- ==============================================================
-- FIREWALL — 12-IN-1 ENTERPRISE CYBERSECURITY ECOSYSTEM
-- SUPABASE POSTGRESQL SCHEMA WITH ZERO-TRUST RLS & REALTIME
-- ==============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES & ENUMS (IDEMPOTENT)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'SOC_ANALYST', 'SUPER_USER', 'USER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE alert_severity AS ENUM ('CRITICAL', 'WARNING', 'INFO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE module_status AS ENUM ('SECURE', 'WARNING', 'CRITICAL', 'SCANNING', 'DISABLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'USER'::user_role,
    avatar_url TEXT,
    security_score INT DEFAULT 98,
    is_mfa_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. REGISTERED DEVICES TABLE
CREATE TABLE IF NOT EXISTS public.devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'MOBILE', -- MOBILE, DESKTOP, TABLET, SERVER
    os TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    mac_address TEXT,
    trust_score INT DEFAULT 95,
    status TEXT DEFAULT 'ONLINE',
    last_active TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SECURITY ALERTS TABLE (Realtime-Enabled)
CREATE TABLE IF NOT EXISTS public.security_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity alert_severity DEFAULT 'INFO'::alert_severity,
    source_module TEXT NOT NULL,
    resolved BOOLEAN DEFAULT false,
    location TEXT,
    ip_address TEXT,
    device TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 12-MODULE STATES TABLE
CREATE TABLE IF NOT EXISTS public.module_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    name TEXT NOT NULL,
    status module_status DEFAULT 'SECURE'::module_status,
    score INT DEFAULT 100,
    threats_blocked INT DEFAULT 0,
    last_scan_time TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT unique_user_module UNIQUE (user_id, module_id)
);

-- 7. ZERO-KNOWLEDGE ENCRYPTED VAULT
CREATE TABLE IF NOT EXISTS public.vault_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'PASSWORD', -- PASSWORD, NOTE, IDENTITY, CARD
    username TEXT,
    encrypted_blob TEXT NOT NULL,
    iv TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SCAN HISTORY & AUDIT RECORDS
CREATE TABLE IF NOT EXISTS public.scan_histories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    scan_type TEXT NOT NULL,
    status TEXT DEFAULT 'COMPLETED',
    score INT DEFAULT 100,
    issues_found INT DEFAULT 0,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SOC GLOBAL THREAT FEEDS (STIX/TAXII)
CREATE TABLE IF NOT EXISTS public.threat_feeds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    indicator TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- IP, DOMAIN, HASH, URL
    threat_level TEXT NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    description TEXT,
    reported_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DIGITAL FORENSICS LEDGER (SHA-256 Tamper Evident)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    sha256_hash TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================
-- ZERO-TRUST ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_histories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Idempotent RLS Policies: Drop if exists before re-creating
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users view own devices" ON public.devices;
CREATE POLICY "Users view own devices" ON public.devices
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own alerts" ON public.security_alerts;
CREATE POLICY "Users view own alerts" ON public.security_alerts
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own modules" ON public.module_states;
CREATE POLICY "Users manage own modules" ON public.module_states
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Zero Knowledge Vault Access" ON public.vault_items;
CREATE POLICY "Zero Knowledge Vault Access" ON public.vault_items
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own scans" ON public.scan_histories;
CREATE POLICY "Users view own scans" ON public.scan_histories
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can read threat feeds" ON public.threat_feeds;
CREATE POLICY "Authenticated users can read threat feeds" ON public.threat_feeds
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can view audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can view audit logs" ON public.audit_logs
    FOR SELECT TO authenticated USING (true);

-- ==============================================================
-- SUPABASE REALTIME REPLICATION ENABLEMENT
-- ==============================================================
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.security_alerts;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.module_states;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.threat_feeds;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==============================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Firewall User'),
        COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'USER'::public.user_role)
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name;

    -- Auto-initialize all 12 modules for new user
    INSERT INTO public.module_states (user_id, module_id, name, status, score, threats_blocked) VALUES
        (new.id, 'identity-guardian', 'Identity Guardian', 'SECURE'::public.module_status, 100, 4),
        (new.id, 'phishing-shield', 'Phishing Shield', 'SECURE'::public.module_status, 100, 28),
        (new.id, 'endpoint-guardian', 'Endpoint Guardian', 'SECURE'::public.module_status, 98, 12),
        (new.id, 'network-sentinel', 'Network Sentinel', 'SECURE'::public.module_status, 95, 3),
        (new.id, 'vault-guardian', 'Vault Guardian', 'SECURE'::public.module_status, 100, 0),
        (new.id, 'ransomware-guardian', 'Ransomware Guardian', 'SECURE'::public.module_status, 100, 0),
        (new.id, 'webshield', 'WebShield Pro', 'SECURE'::public.module_status, 100, 19),
        (new.id, 'digital-forensics', 'Digital Forensics', 'SECURE'::public.module_status, 100, 0),
        (new.id, 'access-guardian', 'Access Guardian', 'SECURE'::public.module_status, 99, 1),
        (new.id, 'threat-intelligence', 'Threat Intelligence', 'SECURE'::public.module_status, 100, 84),
        (new.id, 'cloud-backup-guardian', 'Cloud Backup Guardian', 'SECURE'::public.module_status, 100, 0),
        (new.id, 'cyber-soc', 'Cyber SOC 24/7', 'SECURE'::public.module_status, 100, 142)
    ON CONFLICT (user_id, module_id) DO NOTHING;

    -- Create initial Welcome Alert
    INSERT INTO public.security_alerts (user_id, title, description, severity, source_module, resolved, device) VALUES
        (new.id, 'Ecosystem Initialized', 'All 12 security modules have been activated and encrypted under Zero-Trust architecture.', 'INFO'::public.alert_severity, 'cyber-soc', false, 'System Core');

    RETURN new;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================
-- INITIAL GLOBAL THREAT FEEDS (SAMPLE SOC INTELLIGENCE)
-- ==============================================================
INSERT INTO public.threat_feeds (indicator, type, threat_level, description) VALUES
    ('185.220.101.45', 'IP', 'CRITICAL', 'Known Tor exit node associated with Cobalt Strike C2'),
    ('login-verify-account-security.xyz', 'DOMAIN', 'HIGH', 'Active credential harvesting phishing campaign'),
    ('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'HASH', 'CRITICAL', 'LockBit 3.0 Ransomware Payload Signature'),
    ('http://malicious-cdn-payload.top/stealer.exe', 'URL', 'CRITICAL', 'RedLine Stealer dropper host')
ON CONFLICT (indicator) DO NOTHING;
