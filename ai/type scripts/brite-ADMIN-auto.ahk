; brite-brain-ahk.ahk
; Hotkey: Ctrl+Alt+B — inserts brain phrase + !ADMIN! *dev* br : { on next line
; Escape: Ctrl+Alt+Esc — shuts down this script
; Note: Shift+Enter for newline (avoids sending message in Cursor chat)
; {!} = literal ! (AHK uses ! for Alt, which was opening Copilot)

MsgBox, 64, B-Rite, B-Rite - Dev Script Running (Press ctrl+alt+b to autotype)

^!b::
Send, Read [root/ai/brain.md] then proceed; {Shift Down}{Enter}{Shift Up}{!}ADMIN{!} *dev* br : { {Space}
return

; Escape route — shut down script
^!Esc::
MsgBox, 64, B-Rite, Exited Script
ExitApp
return
