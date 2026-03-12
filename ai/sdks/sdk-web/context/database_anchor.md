# DATABASE ANCHOR

<!-- Template: install to [root/ai/context/database_anchor.md] -->
<!-- Source: AI App Development Handbook 4.2 -->
<!-- Core table list, key relationships, ownership rule. -->

Core Tables: [table1], [table2], [table3]

Relationships:
[table1] → [table2] ([foreign_key])
[table2] → [table3] ([foreign_key])

All user-owned tables include: user_id uuid references auth.users(id)
