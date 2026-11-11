-- ==============================================================
-- FIREWALL — Enterprise PostgreSQL Initialization Script
-- ==============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Grant schema authorizations
GRANT ALL PRIVILEGES ON DATABASE firewall_db TO postgres;
