# Security & Checklist Audit

Run Security Audit and Checklist Verification per handbook 8.5.

**Specs location:** Read security.md, checklist.md from [root/ai/specs/]. If missing, use templates from [root/ai/sdks/sdk-web/specs/].

**Security Audit — identify:**
- Tables missing RLS
- Tables missing any of four standard policies
- Queries that bypass RLS
- Data leaks between users
- Storage buckets without policies
- Any USING (TRUE) or anon access

**Checklist Verification:** For each feature, verify checklist items. Report PASS or FAIL with specific gap.

**Output:** Prioritized report to [root/UI/dev-output/] or return as plain text.
