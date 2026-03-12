; brite-webSDK.ahk
; Hotkey: Ctrl+Alt+B — inserts sdk-web prompt
; Escape: Ctrl+Alt+Esc — shuts down this script
; Note: Shift+Enter for newline (avoids sending message in Cursor chat)

MsgBox, 64, B-Rite, B-Rite - Web SDK Script Running (Press ctrl+alt+b to autotype)

^!b::
Send, {Text}Read [root/ai/brain.md] then proceed; 
Send, {Shift Down}{Enter}{Shift Up}
Send, {Text}!ADMIN! *dev* !sdk|003| br : 
Send, {Space}
return

; Escape route — shut down script
^!Esc::
MsgBox, 64, B-Rite, Exited Script
ExitApp
return
