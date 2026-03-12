# SECURITY ANCHOR

RLS on all tables. Users: user_id = auth.uid(). Admins: is_admin().

Never USING (TRUE) or auth.role() = 'anon' unless explicitly instructed.

handle_new_user trigger creates profile on signup.
