# TASK: User Profile (Auth + Profile Management)

## GOAL
Users can sign up, sign in, and manage their profile (name, avatar).

## DATABASE
Tables involved:
- profiles — id, email, name, role, avatar, created_at

Fields required (if new):
- (none — profiles exists)

## UI
Components required:
- SignInForm — email/password or magic link sign in
- SignUpForm — registration form
- ProfileForm — edit name, avatar
- AuthGuard — redirect unauthenticated users to login

Pages affected:
- /app/page.tsx — home
- /app/login/page.tsx — sign in
- /app/signup/page.tsx — sign up
- /app/profile/page.tsx — profile (protected)

## VALIDATION (Zod)
- Schema file: /lib/schemas/profile.schema.ts
- Fields to validate: name (string, optional), avatar (string url, optional)

## BACKEND
Query functions required in /lib/profile.ts:
- getProfile(userId) → profile | null
- updateProfile(userId, { name?, avatar? }) → profile

## BEHAVIOR
1. User visits /signup, enters email/password, submits
2. Supabase Auth creates user; handle_new_user trigger creates profile
3. User visits /login, signs in
4. User visits /profile, sees form with name/avatar, edits, saves
5. Data persists to profiles table

## API ACTIONS
- getProfile(userId) → profile | null
- updateProfile(userId, fields) → profile

## DONE WHEN
- [ ] User can sign up
- [ ] User can sign in
- [ ] User can view and edit profile
- [ ] Data persists to database
- [ ] Only the user's own profile is visible
- [ ] Error states handled

## NOTES
profiles uses id = auth.uid() (no user_id column). RLS: SELECT/UPDATE own row.
