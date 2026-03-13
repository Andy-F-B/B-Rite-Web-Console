# DATABASE ANCHOR

profiles — id, email, name, role, avatar (user_id = id)
folders — user_id, name (user-owned)
scripts — user_id, folder_id, title, content, archived_at
saved_items — user_id, type, name, content, metadata
plugins — name, description, install_path (catalog; admin-managed)
public_posts — user_id, title, description, version, github_url, content, content_type, allow_public_use, tags, folder_data (public read)
post_reactions — post_id, user_id, type (thumbs_up) (public read)

Ownership: user-owned tables have user_id uuid references auth.users(id)

Public Library: public_posts and post_reactions use public read (select using true) for social feed.
