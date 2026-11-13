
-- =========================================
-- SevaConnect Database Schema
-- =========================================

-- 1. Government Services and Schemes
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    eligibility TEXT,
    required_documents TEXT DEFAULT '[]',
    application_steps TEXT DEFAULT '[]',
    application_mode TEXT DEFAULT 'Unknown'
        CHECK (application_mode IN ('Online', 'Offline', 'Both', 'Unknown')),
    official_url TEXT,
    department TEXT,
    source_url TEXT,
    last_verified TEXT
);

-- 2. Local Government Offices
CREATE TABLE IF NOT EXISTS offices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_name TEXT NOT NULL,
    taluk TEXT NOT NULL,
    address TEXT,
    contact_number TEXT,
    services_handled TEXT DEFAULT '[]',
    official_url TEXT,
    source_url TEXT,
    last_verified TEXT
);

-- 3. Public Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    published_date TEXT,
    deadline TEXT,
    official_url TEXT,
    source_url TEXT,
    status TEXT DEFAULT 'current'
        CHECK (status IN ('current', 'expired')),
    last_verified TEXT
);

-- Search and filtering indexes
CREATE INDEX IF NOT EXISTS idx_services_name
ON services(name);

CREATE INDEX IF NOT EXISTS idx_services_category
ON services(category);

CREATE INDEX IF NOT EXISTS idx_offices_taluk
ON offices(taluk);

CREATE INDEX IF NOT EXISTS idx_offices_name
ON offices(office_name);

CREATE INDEX IF NOT EXISTS idx_announcements_status
ON announcements(status);

CREATE INDEX IF NOT EXISTS idx_announcements_date
ON announcements(published_date);
