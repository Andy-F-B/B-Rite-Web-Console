# DATABASE ANCHOR

Core Tables: profiles, scripts, saved_items, plugins

Relationships:
profiles.id → auth.users(id)
scripts.user_id → auth.users(id)
saved_items.user_id → auth.users(id)

All user-owned tables include: user_id uuid references auth.users(id)
