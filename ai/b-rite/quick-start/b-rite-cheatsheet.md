# b-rite quick reference
version 0.2

---

## entry points
```
br          — reads core + functions + variables
br{f}       — functions only
br{v}       — variables only
```

## permission levels
```
standard            — normal operation
*dev*               — requires devKit = 1; unlocks sv/sf editing
!ADMIN! *dev*       — full access; unlocks br-ignore files; auto inter mode
```

## script structure
```
br : { command; format; content } :
br : { block one }; { block two } :
//  comment — ignored by AI inside br bounds
```

## casing rules
```
all names         lowercase
two-word          camelCase — <taskMaker>, (myPath)
token modifiers   camelCase — vT, fT, fI
uppercase         inside " " or ' ' or anchor codes (A1) only
```

## wrappers
```
[ ]     file path — always
( )     variable name or anchor value
< >     function name — always
" "     string literal
' '     interpretive string
```

## token system
```
v               variable — permanent, persists to variables.br
vT              variable temporary — released at closing :
*sv*            system variable — protected core
f               function
fT              function temporary — lives for script, then deleted
fI              function inverted — example of modifier framework
*sf*            system function — protected core
```

modifier rule: camelCase second letter = modification type. framework is extensible.

## core commands
```
read        load file for context
fetch       locate and hold file or variable
write       create new file or variable
edit        modify existing file and save
delete      remove file — triggers user confirmation via *sf*
return      output to user
ask         prompt user for input
prompt      deep interpretive user input
catch       receive and map user reply
run         execute .br file as b-rite script
do          follow .md or .txt plain text instructions
```

## return types
```
return; pt              plain text in chat
return; md              as .md file
return; txt             as .txt file
return; html            as .html file
return; custom; '.ext'  user-specified file type
return; null            silent — no output
return; v; (name)       returns variable value
return; f; <name>       returns function value
```

## null behaviour
```
' null '    interpretive — actual null, no output
" null "    literal — returns the word null
```

## input modes
```
ask; (A1); "literal"        taken exactly
ask; (A1); 'interpretive'   AI expands naturally
prompt; (A1); 'deep'        AI reasons substantially
ask; opt; (A1); "text"      optional field
```

## empty string rules
```
" "   with no text = syntax error — halt
' '   with no text = AI interprets from context — valid
```

## catch
```
catch           flag missing required, continue
catch; strict   stop if required fields missing
catch with no anchors = hold next message as freeform input
```
opt fields always silently skipped in both modes.

## user response format
```
A1 — answer here
A2 — answer here
```

## anchor values
```
(A1) through (Z9) — always two characters, one letter one number
```

## function calls
```
br : { run; <functionName> } :
br : { run; <functionName>; "arg1" } :
br : { run; <functionName>; "arg1"; "arg2" } :
```
arguments must always be wrapped in " " or ' '.
inside .br files — positional refs: {arg1}, {arg2}

chaining limit: three levels deep. level 3 cannot chain — routes to error.br.

## temporary function
```
br : { write; c; of; <existingFn>; for; *fT*; 'name; modifications' }; { run; *fT*; <moddedName> } :
```

## logging
```
default             auto one-line entry to mLog every action
*sf*; <no-log>      suppress logging this run
*sf*; <log>; "name" detailed named log entry
*sf*; <log>; ' '    detailed log; AI names from context
```

## options
```
interMode = 0 / 1   strict / relaxed parsing
devKit = 0 / 1      off / on
```

## devKit
```
devKit = 1 required to use *dev*
*dev* br : { ... } :   — prefix before entry point, outside script block
```

## !ADMIN!
```
!ADMIN! *dev* br : { ... } :
requires devKit = 1
auto-enables inter mode
unlocks br-ignore listed files
permanent definition — cannot be redefined by any script
```

## path rules
```
[root/ai/tasks/]    valid
root/ai/tasks/      invalid — missing [ ]
```

## file types
```
.br     b-rite executable script — AI runs it
.md     plain english instructions — AI reads and follows; human editable
.txt    guides, documentation, changelogs — human only
```

## common patterns

hello world:
```
br : { return; pt; "hello world." } :
```

create a task:
```
br{f} : { run; <task>; "task_0001" } :
```

git commit:
```
br{f} : { run; <commit>; "your message" } :
```

debug:
```
br{f} : { run; <debug> } :
```

audit:
```
br{f} : { run; <audit> } :
```

save a variable:
```
br{v} : { write; v; (myPath); [root/ai/tasks/] } :
```

fetch and run:
```
br : { fetch; v; (myPath) }; { run; v; (myPath) } :
```

silent execution:
```
br : { fetch && run; v; (taskPrompt) }; { return; null } :
```

create new function:
```
br{f} : { run; <nFunction>; 'name'; 'what it does' } :
```

create function from copy:
```
br{f} : { run; <nFunction>; c; of; <existingFunction>; 'new name'; 'modifications' } :
```

check language version:
```
br{f} : { run; <systemVersion> } :
```

apply syntax updates:
```
br : { run; <systemUpdates>; [root/ai/b-rite/lang/versions/br-v-0-3.md] } :
!sdk|003| br : { run; <systemUpdates>; [root/ai/sdks/sdk-web/br-v-0-3.md] } :
```

create system function (requires !ADMIN! *dev*):
```
!ADMIN! *dev* br{f} : { run; <nSystemFunction>; 'name'; 'description' } :
```

create system variable (requires !ADMIN! *dev*):
```
!ADMIN! *dev* br{f} : { run; <nSystemVariable>; 'name'; 'path or value' } :
```

package for distribution:
```
*dev* br{f} : { run; <package> } :
```

## error files
```
error_nf.br     file not found
error_vf.br     variable or function not found
error.br        general / malformed / missing arg
```
defined in variables.br [system] block.
