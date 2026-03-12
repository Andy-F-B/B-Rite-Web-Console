# Feature Packs — Index

Feature packs are reusable modules you can plug into your app. Each pack lives in `feature-packs/{name}/`.

## Installed Packs

| Pack | Description | Install |
|------|-------------|---------|
| auth-system | Sign up, sign in, profile management | See [auth-system/README.md](auth-system/README.md) |

## How to Plug In

1. **Copy** components and lib from the pack into your project.
2. **Add routes** — create pages that use the components (e.g. `/login`, `/signup`, `/profile`).
3. **Wire Supabase** — ensure env vars and RLS match the pack's requirements.
4. **Update specs** — add the pack's entities to `ai/specs/database.md` and `ui.md` if not already present.

## Creating a New Pack

Run: `*dev* !sdk|003| br : { run; <createFeaturePack> } :`

Or manually:
1. Create `feature-packs/{name}/`
2. Add `README.md` (usage, dependencies)
3. Add `features.md` (components, lib, pages, RLS)
4. Add components/lib files as needed
5. Update this INDEX.md

## Framework

- Packs are **copy-in** — you copy files into your app, not import at runtime.
- Each pack is self-contained. No shared runtime registry.
- `ai/specs/` and `ai/context/` should reflect which packs are installed.
