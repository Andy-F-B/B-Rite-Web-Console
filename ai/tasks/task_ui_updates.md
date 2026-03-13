# TASK: UI Updates (Unified)

<!-- Consolidated from: nav auth, downloads cleanup, profile pic, saved actions -->

## GOAL
Four UI updates: (1) Nav auth state — Sign in/Sign up top right when signed out; Sign out + Profile when signed in. (2) Downloads — Remove old v2 versions, keep only two current downloads. (3) Profile pic + name in nav when signed in (if avatar URL set). (4) Saved page — Copy button, three-dots menu (Save to folder, Archive), create folder at top.

---

## 1. NAV AUTH STATE (ConsoleNav)

### UI
- **ConsoleNav** — Conditional right-side: when signed out → Sign in, Sign up (top right). When signed in → Sign out, Profile (top right). Use Supabase auth state.

### BEHAVIOR
- Fetch auth state (getUser or useSession). If !user: show Sign in, Sign up. If user: show Sign out (calls signOut), Profile link.
- Sign out: supabase.auth.signOut(), redirect or refresh.

### DONE WHEN
- [ ] Signed-out users see Sign in, Sign up top right
- [ ] Signed-in users see Sign out, Profile top right
- [ ] Sign out works

---

## 2. DOWNLOADS CLEANUP

### UI
- **Downloads page** — Remove old v2 items. Keep only two downloads: (1) B-Rite Script Template, (2) Web SDK (zip) or equivalent current versions. Remove: B-Rite Script (zip) v2.0, Web SDK v2.

### BEHAVIOR
- Edit DOWNLOADS array. Remove deprecated entries. Ensure two primary downloads remain.

### DONE WHEN
- [ ] Only two download options shown
- [ ] No v2 legacy references

---

## 3. PROFILE PICTURE + NAME IN NAV

### DATABASE
- profiles.avatar — existing field (text, URL). No migration.

### UI
- **ConsoleNav** — When signed in and profiles.avatar has URL: show avatar img (small, circular) and user name (or email) next to Sign out / Profile. Fetch profile for current user.

### BEHAVIOR
- If user and profile.avatar: render <img src={avatar} /> + name. Else: show Profile link only.

### DONE WHEN
- [ ] Avatar displays when URL set
- [ ] Name displays when available
- [ ] Fallback when no avatar

---

## 4. SAVED PAGE — COPY, FOLDERS, ARCHIVE

### DATABASE
- **scripts** — existing. Optional: add folder_id or folder_name to scripts if folders are per-script. Or new table: folders (id, user_id, name). scripts.folder_id nullable FK.
- **archive** — Option A: scripts.archived boolean. Option B: move to archived_scripts or use metadata. Simplest: scripts.archived_at timestamptz nullable; when set, hide from main list, show in "Archived" view.

### UI
- **Saved page** — Per script card: Copy button (copies content to clipboard). Three-dots (⋯) menu: "Save to folder", "Archive". Top of page: "New folder" button.
- **Folders** — User can create folder. Dropdown or modal to "Save to folder" — select folder, associate script. Or: folders as tags; script can belong to one folder.
- **Archive** — Moves script to archive (archived_at = now). Filter archived from main list. Optional: "Archived" tab/section.

### BEHAVIOR
1. Copy: navigator.clipboard.writeText(script.content). Toast or feedback.
2. ⋯ menu: Save to folder (opens folder picker/modal), Archive (set archived_at, refresh).
3. New folder: create folder, add to list. Scripts can be moved into folder.

### MIGRATION (if folders/archive)
- 003_add_folders_archive.sql: folders table (id, user_id, name, created_at). scripts.folder_id FK nullable. scripts.archived_at timestamptz nullable. RLS on folders.

### DONE WHEN
- [ ] Copy button copies script content
- [ ] ⋯ menu with Save to folder, Archive
- [ ] New folder at top creates folder
- [ ] Archive hides from main list (or moves to archived section)

---

## NOTES
- Nav: ConsoleNav needs to be client component or use a wrapper to read auth state.
- Profile pic: Use img with rounded style. Size ~28px.
- Folders/Archive: Migration 003_folders_archive.sql adds folders table, scripts.folder_id, scripts.archived_at.
- Run migration: `supabase db push` or apply 003_folders_archive.sql.
- RLS: folders and scripts — user sees only own data.

## IMPLEMENTATION STATUS
- [x] 1. Nav auth state (ConsoleNav)
- [x] 2. Downloads cleanup (two items)
- [x] 3. Profile pic + name in nav
- [x] 4. Saved: Copy, three-dots, New folder, Archive
