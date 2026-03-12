# FEATURE COMPLETION CHECKLIST

<!-- From B1 web-app-summary; B-Rite Console features -->

## Auth (login, signup, profile)
- [x] profiles table, RLS, handle_new_user, is_admin
- [x] SignInForm, SignUpForm, ProfileForm, AuthGuard
- [x] lib/profile.ts, profile.schema.ts

## Script Editor (/console)
- [x] ScriptEditor component, Format, Auto-fill, Save
- [x] lib/brite-parser.ts (validateBrite, formatBrite, offsetToLineCol)
- [x] Auto Prompt dropdown (from [root/ai/type scripts])
- [x] Auto-insert `{ ` after `br :` / `} :`
- [x] Syntax errors with line numbers
- [x] scripts save wired, auth-gated (redirect to login)

## Downloads (/downloads)
- [x] /api/downloads/template, /api/downloads/sdk
- [x] Downloads page

## Saved (/saved)
- [x] saved_items table, RLS
- [ ] Page integration — verify

## Plugins
- [x] plugins table, RLS (authenticated read, admin write)
- [ ] Install flow — verify
