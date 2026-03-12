# Language evolution checklist
**when adding or changing core b-rite language elements**

## adding new *sf* (system function)

Use: !ADMIN! *dev* br{f} : { run; <nSystemFunction>; 'name'; 'description' } :

Or manually:
- [ ] create [root/ai/b-rite/functions/sf_name.br]
- [ ] add to functions.br
- [ ] add to variables.br [system] if path variable needed
- [ ] update brain.md system functions list
- [ ] update fileIntegrityScan.md
- [ ] update lang.md
- [ ] add to lang-changelog.txt
- [ ] update quick-start/b-rite-cheatsheet.md (if user-facing)
- [ ] version bump if new release

## adding new *sv* (system variable)

Use: !ADMIN! *dev* br{f} : { run; <nSystemVariable>; 'name'; 'path or value' } :

Or manually:
- [ ] add to variables.br [system]
- [ ] update fileIntegrityScan.md system vars
- [ ] update lang.md
- [ ] add to lang-changelog.txt
- [ ] update quick-start/b-rite-cheatsheet.md (if user-facing)
- [ ] version bump if new release

## adding new standard function

Use: br{f} : { run; <nFunction>; 'name'; 'description' } :
- [ ] functions.br
- [ ] lang.md
- [ ] quick-start/b-rite-cheatsheet.md (if user-facing; add to common patterns or relevant section)

## adding new user variable

Use: br{f} : { run; <nVariable>; 'name'; 'value' } :
- [ ] variables.br
- [ ] lang.md
- [ ] quick-start/b-rite-cheatsheet.md (if user-facing)

## SDK/plugin propagation

After core changes: run <systemUpdates> with version file, or manually run !sdk|###| and !plugin|###| systemUpdates for each.

## version file format

See [root/ai/b-rite/lang/versions/version-file-spec.md] for required structure, sections (MAIN, SDK, PLUGIN), and {DELETE} syntax.
