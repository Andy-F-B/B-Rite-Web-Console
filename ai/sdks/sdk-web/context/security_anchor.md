# SECURITY ANCHOR

<!-- Template: install to [root/ai/context/security_anchor.md] -->
<!-- Source: AI App Development Handbook 4.2 -->
<!-- RLS requirement summary. AI must check this before writing any SQL. -->

RLS enabled on ALL tables.

Users access only rows where: user_id = auth.uid()

Admins access all rows.

Never use: USING (TRUE) or auth.role() = 'anon'
