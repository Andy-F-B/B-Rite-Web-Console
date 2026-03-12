# Plugin syntax update — template
**place this in plugin root.** copy version update file (e.g. br-v-0-3.md) from [root/ai/b-rite/lang/versions/] into this plugin folder, then run:

!plugin|###| br : { run; <systemUpdates>; [root/ai/plugins/plugin-name/br-v-X-X.md] } :

Replace ### with plugin code (e.g. 001 for plugin-podcast). Replace plugin-name and br-v-X-X with actual names.

**Rule:** systemUpdates applies the PLUGIN section from the file. Analyze changes. Update plugin .br files only if the update affects them. If no effect, do not alter.
