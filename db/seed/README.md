# Seed Data — Instructions

## Purpose

Seed data provides sample/demo records for local development and testing. It does **not** run in production.

## When to Use

- Local development
- Testing UI with realistic data
- Demo environments

## How to Run

1. **Apply migrations first.** Run `db/migrations/001_initial_schema.sql` and `002_*.sql` in Supabase SQL Editor.

2. **Run seed script.** Execute `db/seed/seed.sql` in Supabase SQL Editor **after** migrations.

3. **Or use Supabase CLI:**
   ```bash
   supabase db reset   # applies migrations + seed (if configured)
   ```

## Structure

- `seed.sql` — inserts sample profiles, scripts, etc.
- `README.md` — this file

## Notes

- Seed data uses test emails (e.g. `test@example.com`). Change passwords in Supabase Auth if needed.
- RLS still applies. Seed as a user with known UUID or use `SECURITY DEFINER` for setup-only inserts.
- Do not commit production credentials. Seed is for schema + sample data only.
