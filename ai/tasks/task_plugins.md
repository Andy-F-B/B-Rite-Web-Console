# TASK: Plugins Catalog

## GOAL
Admins can manage plugin catalog; authenticated users can read plugin list.

## DATABASE
Tables involved:
- plugins — name, description, install_path, created_at

## UI
Components required:
- (Optional) Admin: plugin management UI
- User: plugin list on /downloads or dedicated page

Pages affected:
- /app/downloads/page.tsx — Install Plugins section

## VALIDATION
- Admin insert: name required, description, install_path

## BACKEND
Query functions in lib/:
- listPlugins() → plugin[] (authenticated)
- insertPlugin (admin only)
- updatePlugin, deletePlugin (admin only)

## BEHAVIOR
1. Authenticated user sees plugin catalog
2. Admin can add/update/delete plugins
3. Users see install instructions (b-rite <install>)

## API ACTIONS
- listPlugins() → plugin[]
- (Admin) insertPlugin, updatePlugin, deletePlugin

## DONE WHEN
- [ ] Authenticated users can read plugins
- [ ] Admins can manage catalog
- [ ] RLS: authenticated read, admin write

## NOTES
plugins table: no user_id. RLS: authenticated read; is_admin() for write.
