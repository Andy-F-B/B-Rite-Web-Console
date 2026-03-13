# TASK: Public Library + Editor Fixes (Unified)

<!-- Public Library page, post creation, folder upload + tags + filter, script editor syntax + line numbers -->

## GOAL
Four updates: (1) Public Library page — social-style place for public code snippets; add to landing and nav; "Post to Public Library" in Saved ⋯ menu. (2) Post creation — title, description, version, optional GitHub link, reactions, save/copy if allow public use; profile shows post count; edit/delete. (3) Folder upload as post; tags when posting; filter on library page. (4) Script editor — no syntax/errors inside ' ' or " "; // comments grey only between delimiters; add line numbers synced with errors.

---

## 1. PUBLIC LIBRARY PAGE

### DATABASE
- **public_posts** table (see migration below). RLS: public read; insert/update/delete own.

### UI
- **app/library/page.tsx** — New page. Simple social-style feed of public code/script snippets. GitHub-style cards: title, description (what it is, what it does, who can use it), author, version, tags, reactions, save/copy if allowed.
- **app/page.tsx** — Add "Public Library" link/button.
- **ConsoleNav** — Add "Library" link in nav.
- **app/saved/page.tsx** — In ⋯ menu per script: add "Post to Public Library". Click navigates to post creation with content pre-filled.

### BEHAVIOR
- Library page lists public posts. Each card: title, description, version, tags, thumbs up count, author. If allow_public_use: show Save/Copy. Click to expand or view full.
- "Post to Public Library" from Saved: go to /library/new?content=... or /library/new with content in state.

### DONE WHEN
- [ ] /library page exists
- [ ] Landing and nav include Library link
- [ ] Saved ⋯ menu has "Post to Public Library"
- [ ] Post creation flow (see #2)

---

## 2. POST CREATION LOGIC

### DATABASE
- **public_posts** — id, user_id, title, description, version (text), github_url (nullable), content (text), content_type ('snippet' | 'folder'), allow_public_use (boolean), created_at, updated_at. RLS: select for all (public), insert/update/delete for own.
- **post_reactions** — id, post_id, user_id, type ('thumbs_up'), created_at. Unique (post_id, user_id, type). RLS: select all, insert own, delete own.
- **profiles** — add post_count or compute via join.

### UI
- **app/library/new/page.tsx** — Post creation form: title, description (textarea), version, optional GitHub link, allow_public_use checkbox, tags (multi-select or input), content (pre-filled from Saved). Submit creates post.
- **app/library/[id]/page.tsx** — Post detail: full content, reactions (thumbs up), Save/Copy if allow_public_use. Edit/Delete if own post.
- **app/profile/page.tsx** — Show "X posts" in profile.
- **Post card** — Thumbs up button, count. Save/Copy if allow_public_use.

### BEHAVIOR
- Create: required title, description, version. Optional: github_url, tags. allow_public_use toggles Save/Copy visibility.
- Reactions: thumbs up increments count; user can toggle (one per user per post).
- Edit/Delete: only post owner. Edit opens form with existing data.
- Profile: count posts where user_id = profile.id.

### DONE WHEN
- [ ] Post creation form with all fields
- [ ] Thumbs up reactions
- [ ] Save/Copy when allow_public_use
- [ ] Profile shows post count
- [ ] Edit and Delete for owner

---

## 3. FOLDER UPLOAD + TAGS + FILTER

### DATABASE
- **public_posts.content_type** — 'snippet' | 'folder'. For folder: content stores JSON of file tree + contents, or zip/base64. Or separate table **post_files** (post_id, path, content).
- **post_tags** — id, post_id, tag (text). Or tags as jsonb on public_posts. Many-to-many: **tags** (id, name), **post_tags** (post_id, tag_id).
- Simpler: **public_posts.tags** — text[] or jsonb array of tag strings.

### UI
- **Post creation** — Option: "Single snippet" or "Upload folder". Folder: file picker or drag-drop; structure stored. Tags: multi-select from predefined list + custom input. Filter on library: by tag, search.
- **app/library/page.tsx** — Filter bar: tag dropdown, search input. Filter posts client-side or server-side.

### BEHAVIOR
- Folder upload: user selects folder; zip or traverse and store as JSON. Display as expandable tree in post view.
- Tags: select from list (e.g. b-rite, sdk, template, plugin) or add custom. Stored per post.
- Filter: select tag(s), type search — filter posts. Query: WHERE tags @> ARRAY[tag] OR title ILIKE search.

### DONE WHEN
- [ ] Folder upload option in post creation
- [ ] Tags on post creation
- [ ] Filter by tag and search on library page

---

## 4. SCRIPT EDITOR — STRING + COMMENT + LINE NUMBERS

### UI/BEHAVIOR
- **lib/brite-tokenizer.ts** — Text inside `' '` or `" "` (single/double quoted strings): treat as plain text, no syntax coloring or error application. User can type anything. Exception: `// comment` — grey only the text *between* `//` and end of line (or next `//` if applicable). Grey should not extend past the closing `//` of a line comment (i.e. `// grey text //` — grey only " grey text ", not " grey text //" or anything after).
- **lib/brite-parser.ts** — validateBrite: do not report syntax errors for content inside quoted strings. Skip validation inside ' ' and " ".
- **ScriptEditor** — Add line numbers on left side. Synced with textarea (same line height). Error list references line numbers — ensure offsetToLineCol and error display use same line numbering.

### RULES
- Strings: `"..."` and `'...'` — content is literal. No tokenization for syntax, no errors.
- Comments: `//` to EOL — grey. If `// x //` appears, grey only ` x ` (between first // and second //). Actually: standard line comment is `//` to end of line. So `// grey text` — grey " grey text". The "and not after" means: don't grey anything after the newline. The "only between // and //" might mean: if user writes `// foo // bar`, grey " foo " only, not " bar". Clarify: typically `//` comments to EOL. So `// everything to newline` is grey. "only between" = don't grey the `//` delimiters themselves? Or don't grey content on next line. Assume: `//` to EOL, grey that line's comment content. "not after" = don't grey subsequent lines.
- Line numbers: 1, 2, 3... on left. Scroll sync with editor. Errors show "Line X" — use same line numbering.

### DONE WHEN
- [ ] Strings: no syntax color/errors inside ' ' or " "
- [ ] Comments: grey only between // and EOL (or between // and // on same line)
- [ ] Line numbers on left, synced
- [ ] Error line numbers match

---

## MIGRATION

```sql
-- 004_public_library.sql
create table public_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  version text not null,
  github_url text,
  content text not null,
  content_type text not null check (content_type in ('snippet', 'folder')),
  allow_public_use boolean default true,
  tags text[] default '{}',
  folder_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public_posts enable row level security;
create policy "Public read posts" on public_posts for select using (true);
create policy "Users insert own posts" on public_posts for insert with check (user_id = auth.uid());
create policy "Users update own posts" on public_posts for update using (user_id = auth.uid());
create policy "Users delete own posts" on public_posts for delete using (user_id = auth.uid());

create table post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('thumbs_up')),
  created_at timestamptz default now(),
  unique(post_id, user_id, type)
);
alter table post_reactions enable row level security;
create policy "Public read reactions" on post_reactions for select using (true);
create policy "Users insert own reactions" on post_reactions for insert with check (user_id = auth.uid());
create policy "Users delete own reactions" on post_reactions for delete using (user_id = auth.uid());
```

---

## NOTES
- Profile post count: `select count(*) from public_posts where user_id = ?`
- Folder storage: JSON structure { files: [{ path, content }] } or similar.
- Predefined tags: b-rite, sdk, template, plugin, utility, etc.
