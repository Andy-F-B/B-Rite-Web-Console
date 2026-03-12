# Auth System — Feature Spec

## Components
- SignInForm — email/password or magic link
- SignUpForm — registration
- ProfileForm — edit name, avatar
- AuthGuard — protect routes

## Lib
- getProfile(userId) → profile
- updateProfile(userId, fields) → profile

## Pages
- /app/login/page.tsx
- /app/signup/page.tsx
- /app/profile/page.tsx

## RLS
profiles: SELECT/UPDATE own row. Admins: full access via is_admin().
