; brite-brain-script.ahk
; Hotkey: Ctrl+Alt+B — inserts brain phrase + br : { on next line
; Escape: Ctrl+Alt+Esc — shuts down this script
; Note: Shift+Enter for newline (avoids sending message in Cursor chat)

MsgBox, 64, B-Rite, B-Rite - Dev Script Running (Press ctrl+alt+b to autotype)

^!b::
Send, Read [root/ai/brain.md] then proceed; {Shift Down}{Enter}{Shift Up}br : { {Space}
return

; Escape route — shut down script
^!Esc::
MsgBox, 64, B-Rite, Exited Script
ExitApp
return
