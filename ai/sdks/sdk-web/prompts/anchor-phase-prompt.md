# Anchor Phase — Generate Context Anchors

Generate the four core anchors per handbook 4.2.

**First-run safety:** If [root/ai/specs/product.md] does not exist, read from [root/ai/sdks/sdk-web/specs/product.md] instead. Same for architecture.md, database.md, security.md. Use SDK templates as source when target specs are missing.

**Output to [root/ai/context/]:**
- product_anchor.md — 3–10 bullets, app name, core actions, primary entities
- architecture_anchor.md — stack, auth, client-DB flow, under 15 lines
- database_anchor.md — core tables, relationships, ownership rule
- security_anchor.md — RLS summary, never USING (TRUE) or anon

**Templates:** Use [root/ai/sdks/sdk-web/context/] templates when generating. Keep each anchor short.
