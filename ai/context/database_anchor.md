# DATABASE ANCHOR

profiles — id, email, name, role, avatar (user_id = id)
scripts — user_id, title, content
saved_items — user_id, type, name, content, metadata
plugins — name, description, install_path (catalog; admin-managed)

Ownership: user-owned tables have user_id uuid references auth.users(id)
