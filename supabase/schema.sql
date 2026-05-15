-- Supabase Schema for Wedding Invitation Management System

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Wedding Config & Information
CREATE TABLE IF NOT EXISTS wedding_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    groom_name VARCHAR(255) NOT NULL,
    bride_name VARCHAR(255) NOT NULL,
    groom_nickname VARCHAR(100),
    bride_nickname VARCHAR(100),
    wedding_date TIMESTAMPTZ NOT NULL,
    hero_image_url TEXT,
    story_text_en TEXT,
    story_text_id TEXT,
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Events Schedule
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    event_date TIMESTAMPTZ NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    venue_name VARCHAR(255) NOT NULL,
    venue_address TEXT NOT NULL,
    google_maps_url TEXT,
    is_main_event BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RSVPs
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email VARCHAR(255),
    attendance_status VARCHAR(50) NOT NULL CHECK (attendance_status IN ('attending', 'declined', 'pending')),
    guest_count INT DEFAULT 1,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Wedding Wishes
CREATE TABLE IF NOT EXISTS wishes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Gift Recommendations (Wishlist)
CREATE TABLE IF NOT EXISTS gift_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT,
    image_url TEXT,
    estimated_price DECIMAL(10,2),
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_by_name VARCHAR(255),
    claimed_by_email VARCHAR(255),
    claimed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Bank Accounts for Digital Gifts
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    account_holder VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Physical Gift Address
CREATE TABLE IF NOT EXISTS physical_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Gallery Media
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    media_url TEXT NOT NULL,
    media_type VARCHAR(50) DEFAULT 'image',
    caption_en TEXT,
    caption_id TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE wedding_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE physical_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- 1. Wedding Config (Public read, Auth write)
CREATE POLICY "Public can view wedding config" ON wedding_config FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage wedding config" ON wedding_config FOR ALL USING (auth.role() = 'authenticated');

-- 2. Events (Public read, Auth write)
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage events" ON events FOR ALL USING (auth.role() = 'authenticated');

-- 3. RSVPs (Public insert, Auth all)
CREATE POLICY "Public can insert rsvp" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can manage rsvps" ON rsvps FOR ALL USING (auth.role() = 'authenticated');

-- 4. Wishes (Public read approved & insert, Auth all)
CREATE POLICY "Public can view approved wishes" ON wishes FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can insert wishes" ON wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can manage wishes" ON wishes FOR ALL USING (auth.role() = 'authenticated');

-- 5. Gift Items (Public read & update claim, Auth all)
CREATE POLICY "Public can view gift items" ON gift_items FOR SELECT USING (true);
-- Allow public to ONLY update is_claimed, claimed_by_name, claimed_by_email where it's currently false
CREATE POLICY "Public can claim unclaimed gifts" ON gift_items FOR UPDATE 
    USING (is_claimed = false) 
    WITH CHECK (is_claimed = true AND claimed_by_name IS NOT NULL);
CREATE POLICY "Authenticated can manage gift items" ON gift_items FOR ALL USING (auth.role() = 'authenticated');

-- 6. Bank Accounts (Public read active, Auth all)
CREATE POLICY "Public can view active bank accounts" ON bank_accounts FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage bank accounts" ON bank_accounts FOR ALL USING (auth.role() = 'authenticated');

-- 7. Physical Address (Public read active, Auth all)
CREATE POLICY "Public can view active addresses" ON physical_addresses FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage addresses" ON physical_addresses FOR ALL USING (auth.role() = 'authenticated');

-- 8. Gallery (Public read active, Auth all)
CREATE POLICY "Public can view active gallery" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- Create generic updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update timestamp
CREATE TRIGGER update_wedding_config_modtime BEFORE UPDATE ON wedding_config FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_rsvps_modtime BEFORE UPDATE ON rsvps FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_gift_items_modtime BEFORE UPDATE ON gift_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
