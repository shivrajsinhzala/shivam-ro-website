-- Shivam Aqua Solution — D1 Products Table
CREATE TABLE IF NOT EXISTS products (
  id            TEXT PRIMARY KEY,
  name_en       TEXT NOT NULL,
  name_gu       TEXT DEFAULT '',
  badge_en      TEXT DEFAULT '',
  badge_gu      TEXT DEFAULT '',
  category      TEXT DEFAULT 'domestic',
  images        TEXT DEFAULT '[]',       -- JSON array of image URLs
  tagline_en    TEXT DEFAULT '',
  tagline_gu    TEXT DEFAULT '',
  capacity_en   TEXT DEFAULT '',
  capacity_gu   TEXT DEFAULT '',
  warranty_en   TEXT DEFAULT '',
  warranty_gu   TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_gu TEXT DEFAULT '',
  features_en   TEXT DEFAULT '[]',      -- JSON array
  features_gu   TEXT DEFAULT '[]',      -- JSON array
  specs_en      TEXT DEFAULT '{}',      -- JSON object
  specs_gu      TEXT DEFAULT '{}',      -- JSON object
  meta_title    TEXT DEFAULT '',
  meta_desc     TEXT DEFAULT '',
  sort_order    INTEGER DEFAULT 0,
  created_at    TEXT DEFAULT (datetime('now'))
);
