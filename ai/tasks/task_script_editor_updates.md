# TASK: Script Editor Updates (Unified)

<!-- Four script editor enhancements: feature library tab, named saves, Insert button, remove Auto-fill -->

## GOAL
Four updates to the B-Rite Console script editor: (1) Feature library builder tab and Ctrl+Alt+D entry when web-sdk selected. (2) Allow user to name saved scripts. (3) Add Insert button to import saved scripts. (4) Remove Auto-fill, place Insert in its spot.

---

## 1. FEATURE LIBRARY BUILDER (web-sdk)

### UI
- **ConsoleEditorHeader** — When web-sdk is selected, add a new tab next to "Function library" dropdown. Tab label: **"feature library info/commands"**. Clicking opens a popup/modal.
- **Popup content** — Commands and process for creating a feature library (feature pack). Template structure. Info required: name (kebab-case), description.
- **Ctrl+Alt+D** — When web-sdk mode: include `<createFeaturePack>` in search results. Show command: `run; <createFeaturePack>`. Description: scaffold feature pack in feature-packs/.

### BEHAVIOR
- Tab is a button or link. On click: show modal/panel with:
  - Command: `*dev* !sdk|003| br : { run; <createFeaturePack> } :`
  - Process: AI asks for (A1) name kebab-case, (A2) description. Creates feature-packs/{name}/ with README.md, features.md.
  - Template: README.md (# name — description, Usage), features.md (Components, Lib, Pages, RLS).
- FunctionSearchBar / function-search-data: add createFeaturePack entry when mode is sdk-web. Insert text: `run; <createFeaturePack>`

### DONE WHEN
- [x] Tab "feature library info/commands" visible when web-sdk selected
- [x] Click opens popup with commands, process, template
- [x] Ctrl+Alt+D shows createFeaturePack when web-sdk mode
- [x] Keybinds bar mentions feature library (optional)

---

## 2. NAME SAVED SCRIPTS

### DATABASE
- scripts.title — existing, not null. No migration. Currently auto-set to `Script ${date}`.

### UI
- **Console page** — On Save: if new script (not edit mode), prompt user for title before insert. Or: show inline input/field for title next to Save. Or: modal "Name your script" with input.
- **Saved page** — Already displays title. No change if we add naming at save time.

### BEHAVIOR
- When user clicks Save and it's a new script (no loadId or !isEditMode): show prompt/input for title. User enters name. Insert with that title.
- When editing existing: keep current title or allow rename (optional; can defer).
- Default: if user skips, use `Script ${date}` as fallback.

### DONE WHEN
- [x] User can enter a name when saving new script
- [x] Title persists to scripts.title
- [x] Saved page shows user-provided name

---

## 3. INSERT BUTTON (saved scripts)

### UI
- **ScriptEditor toolbar** — Add "Insert" button. Placed where Auto-fill was (see #4).
- **Insert UX** — Dropdown or directory-style menu (like Ctrl+Alt+D). Lists user's saved scripts. Click one → insert content at cursor.

### BEHAVIOR
- Fetch scripts for current user (same as Saved page).
- Display as dropdown/list: title, maybe date. Click inserts script content at cursor.
- Can reuse FunctionSearchBar pattern: modal/panel with list, search optional.
- Or: simple dropdown with script titles. Select → insert content.

### DONE WHEN
- [x] Insert button visible in toolbar
- [x] Click opens list of saved scripts
- [x] Selecting a script inserts its content at cursor

---

## 4. REMOVE AUTO-FILL, PLACE INSERT

### UI
- **ScriptEditor** — Remove "Auto-fill" button. Place "Insert" button in that position (between Format and Save).

### BEHAVIOR
- Delete handleAutoFill, Auto-fill button.
- Add Insert button. Wire to saved-scripts picker (see #3).

### DONE WHEN
- [x] Auto-fill button removed
- [x] Insert button in its place
- [x] Toolbar order: Format | Insert | Save

---

## NOTES
- Feature library = feature pack. createFeaturePack.br is the builder.
- Insert: requires auth. Redirect to login if not signed in.
- Title prompt: can be a simple prompt() or a small modal. Prefer modal for consistency.
