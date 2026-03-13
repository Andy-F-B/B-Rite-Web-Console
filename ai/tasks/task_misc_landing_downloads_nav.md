# TASK: Misc — Landing, Downloads, Nav (Unified)

<!-- Changelog/news on landing, downloads platform text, mobile nav, Documentation section with PDFs -->

## GOAL
Four misc updates: (1) Add changelog summary and news to landing page, incl. b-rite v0.2 and Web SDK v3.0 release; expand intro paragraph. (2) Ensure downloads specify Windows, macOS, Linux for SDK and native. (3) Mobile-only: adjust header layout (hamburger/side menu). (4) Downloads: add Documentation section with Web SDK Guide PDF and AI App Development Handbook PDF; thumbnail, description, sleek layout.

---

## 1. LANDING PAGE — CHANGELOG, NEWS, INTRO

### UI
- **app/page.tsx** — Add section with changelog summary from most recent native b-rite version (lang-changelog.txt, v0.2). Add news: Web SDK v3.0 release. Add ~half paragraph more descriptive intro explaining what B-Rite Console is (script editor, b-rite DSL, SDK integration, etc.). Keep current objects (Open Editor, Downloads, Saved).

### SOURCES
- [root/ai/b-rite/lang/lang-changelog.txt] — v0.2 summary
- Web SDK v3.0 — release news

### BEHAVIOR
- Changelog: brief bullet or summary of v0.2 highlights (e.g. systemVersion, systemUpdates, token map, devKit, etc.).
- News: "Web SDK v3.0 released — full sdk-web for Next.js + Supabase."
- Intro: expand current one-liner to ~half paragraph: B-Rite Console is a web app for writing and managing b-rite scripts. It provides auto-formatting, syntax validation, SDK integration (web-sdk), and downloads for the official template and Web SDK. Use it to run b-rite workflows, save scripts, and build AI-driven web apps.

### DONE WHEN
- [x] Changelog summary visible on landing
- [x] Web SDK v3.0 news visible
- [x] Intro paragraph expanded
- [x] Current CTA buttons preserved

---

## 2. DOWNLOADS — PLATFORM TEXT

### UI
- **app/downloads/page.tsx** — Ensure each download explicitly states "Windows, macOS, Linux" (or "Windows, MacOS, Linux" per user preference). Both SDK and native/template downloads.

### BEHAVIOR
- B-Rite Script Template: already has platform text. Verify.
- Web SDK (zip): already has platform text. Verify.
- If any download lacks it, add.

### DONE WHEN
- [x] All downloads show Windows, macOS, Linux

---

## 3. MOBILE HEADER LAYOUT

### UI
- **ConsoleNav** — On mobile only (e.g. viewport < 600px or 768px): replace horizontal nav with hamburger menu (☰ or ||| flipped). Click opens side drawer/slide-out menu with links. Header fits properly on small screens.

### BEHAVIOR
- Use CSS media query or JS to detect mobile. Below breakpoint: show hamburger icon. Click: toggle drawer. Drawer slides in from right (or left). Contains: Logo, B-Rite Console, Editor, Downloads, Saved, Privacy, Sign in/up or Profile/Sign out.
- Above breakpoint: current horizontal layout.

### DONE WHEN
- [x] Mobile: hamburger visible, nav hidden
- [x] Click opens side menu
- [x] Header fits on mobile
- [x] Desktop unchanged

---

## 4. DOWNLOADS — DOCUMENTATION SECTION

### UI
- **app/downloads/page.tsx** — Add collapsible "Documentation" section below current downloads. Closed by default. Contains:
  - **Web SDK Guide v.3.0 - PDF** — [root/public/downloads/Web-SDK-Guide-v.3.0.pdf]
  - **AI App Development Handbook v.2.1 - PDF** — [root/public/downloads/AI_App_Development_Handbook_V2_1.pdf]
- Each doc: brief description, thumbnail of first page (or placeholder), download link. Sleek, simple layout.

### FILES
- /downloads/Web-SDK-Guide-v.3.0.pdf (public)
- /downloads/AI_App_Development_Handbook_V2_1.pdf (public)

### BEHAVIOR
- Collapsible header "Documentation" — click to expand/collapse.
- Each item: title, 1–2 sentence description, thumbnail (first page of PDF — may use placeholder or pdf.js for client-side render; or static image if pre-generated).
- Download link: href to /downloads/Web-SDK-Guide-v.3.0.pdf etc.
- Sleek, minimal design.

### DONE WHEN
- [x] Documentation section with closed header
- [x] Two PDF downloads with description
- [x] Thumbnail (or placeholder) per doc
- [x] Download links work
- [x] Simple, clean layout

---

## NOTES
- Breakpoint: use 600 or 768px for mobile. Check ai/sdks/sdk-web/variables.br breakpoints.
- PDF thumbnails: pdf.js can render first page to canvas; or use a static screenshot. Placeholder acceptable if complex.
- Keep existing downloads section structure.
