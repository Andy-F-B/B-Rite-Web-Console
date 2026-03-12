# DATABASE SPEC

<!-- Template: install to [root/ai/specs/database.md] -->
<!-- Source: AI App Development Handbook 2.5 -->
<!-- Update this file whenever you run a migration. -->

List every table and its fields. This prevents AI from inventing non-existent tables or columns.

Table: [table_name]
  id uuid primary key
  [field] [type]
  user_id uuid references auth.users(id)

[Add all tables. All user-owned tables include: user_id uuid references auth.users(id)]
