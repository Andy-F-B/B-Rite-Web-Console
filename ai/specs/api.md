# API SPEC

<!-- Template: install to [root/ai/specs/api.md] -->
<!-- Source: AI App Development Handbook 2.6 -->

List all API actions as function signatures.

- getProfile(id) → profile
- updateProfile(id, fields) → profile
- createScript(userId, title, content) → script
- listScripts(userId) → script[]
- createSavedItem(userId, type, name, content?) → saved_item
- listSavedItems(userId, type?) → saved_item[]
- create[Entity](params) → entity
- update[Entity](id, fields) → entity
- delete[Entity](id) → void
- list[Entities](filter?) → entity[]
