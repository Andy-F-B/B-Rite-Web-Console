# SDK syntax update — template
**place this in SDK root.** copy version update file (e.g. br-v-0-3.md) from [root/ai/b-rite/lang/versions/] into this SDK folder, then run:

!sdk|###| br : { run; <systemUpdates>; [root/ai/sdks/sdk-name/br-v-X-X.md] } :

Replace ### with SDK code (e.g. 003 for sdk-web). Replace sdk-name and br-v-X-X with actual names.

**Rule:** systemUpdates applies the SDK section from the file. Analyze changes. Update SDK .br files only if the update affects them. If no effect, do not alter.
