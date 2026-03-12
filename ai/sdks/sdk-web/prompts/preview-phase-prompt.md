# Preview Phase

Generate HTML preview per handbook 9.5, 9.6.

**First-run:** If [root/ai/specs/ui.md] missing, read [root/ai/sdks/sdk-web/specs/ui.md].

**If arg2 is "multi":** Create responsive_preview.html with frames 390px, 768px, 1280px, 1440px side by side.
**Else:** Create mobile_preview.html at 390px.

**Include:** Header/nav, feature UI, responsive CSS. Use design_tokens from [root/ai/sdks/sdk-web/ui-schema/design_tokens.yaml].

**Output:** [root/UI/]
