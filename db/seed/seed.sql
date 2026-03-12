-- Seed data for local development
-- Run AFTER migrations. Use in Supabase SQL Editor or: supabase db reset

-- Optional: create a test profile (requires auth.users row first)
-- If using Supabase local dev, sign up a user first, then:
-- INSERT INTO profiles (id, email, name, role) 
-- SELECT id, email, 'Test User', 'user' FROM auth.users LIMIT 1
-- ON CONFLICT (id) DO NOTHING;

-- Example: seed plugins catalog (admin-managed, no user_id)
-- Run once. If re-running, delete existing rows first or skip.
INSERT INTO plugins (name, description, install_path) VALUES
  ('auth-system', 'Sign up, sign in, profile management', '[root/feature-packs/auth-system/]');

-- Add more seed data as needed for your app.
