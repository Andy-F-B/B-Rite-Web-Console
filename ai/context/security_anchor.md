# SECURITY ANCHOR

RLS on all tables. Users: user_id = auth.uid(). Admins: is_admin().

Never USING (TRUE) or auth.role() = 'anon' unless explicitly instructed.

Exception: public_posts and post_reactions use public read (using true) for Public Library — explicitly required for social feature.

handle_new_user trigger creates profile on signup.
