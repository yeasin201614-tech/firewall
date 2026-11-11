import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key') &&
    !supabaseAnonKey.includes('placeholder')
);

// Client-side Supabase instance
export const supabaseAdminClient: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-firewall.supabase.co',
  serviceRoleKey || (isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key'),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/**
 * Fetch SOC Realtime Threat Intelligence Feeds from Supabase
 */
export async function getThreatFeedsFromSupabase() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabaseAdminClient
    .from('threat_feeds')
    .select('*')
    .order('reported_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch threat feeds:', error);
    return null;
  }
  return data;
}

/**
 * Fetch Forensics Digital Audit Ledger from Supabase
 */
export async function getAuditLogsFromSupabase() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabaseAdminClient
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    return null;
  }
  return data;
}
