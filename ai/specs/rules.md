# DEVELOPMENT RULES

<!-- Template: install to [root/ai/specs/rules.md] -->
<!-- Source: AI App Development Handbook 2.6 -->

Hard constraints AI must never violate.

## Supabase Client
- Always use /lib/supabase.ts for browser (client components)
- Always use /lib/supabase-server.ts for server components, actions, routes
- Never create additional client instances anywhere else

## Schema
- Never modify schema.sql directly — all changes via migrations
- Never use DROP COLUMN on production tables
- All migrations must be reviewed before applying

## Code Style
- TypeScript strict mode — no `any` types
- All inputs validated with Zod before database operations
- Components in /components — pages in /app — queries in /lib

## AI Constraints
- Do not modify files outside the scope of the current task
- Do not install new packages without explicit instruction
- Do not deviate from /ai/security.md under any circumstances

## Security Headers
- Never remove or relax security headers in next.config.ts without explicit instruction
