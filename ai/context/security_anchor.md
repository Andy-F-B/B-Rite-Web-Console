# SECURITY ANCHOR

RLS enabled on ALL tables.

Users access only rows where: user_id = auth.uid() (or id = auth.uid() for profiles)

Admins access all rows via is_admin() helper.

Never use: USING (TRUE) or auth.role() = 'anon'
