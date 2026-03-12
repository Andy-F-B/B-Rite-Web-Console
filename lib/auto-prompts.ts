/**
 * Auto Prompt options — sourced from [root/ai/type scripts].
 * Each entry maps to an .ahk file's Send text (newline = \n).
 */

export const AUTO_PROMPTS: { id: string; name: string; text: string }[] = [
  {
    id: 'brite-auto',
    name: 'Brain + br',
    text: 'Read [root/ai/brain.md] then proceed;\nbr : { ',
  },
  {
    id: 'brite-dev-auto',
    name: 'Brain + *dev* br',
    text: 'Read [root/ai/brain.md] then proceed;\n*dev* br : { ',
  },
  {
    id: 'brite-ADMIN-auto',
    name: 'Brain + !ADMIN! *dev* br',
    text: 'Read [root/ai/brain.md] then proceed;\n!ADMIN! *dev* br : { ',
  },
  {
    id: 'brite-webSDK',
    name: 'Brain + !sdk|003| br',
    text: 'Read [root/ai/brain.md] then proceed;\n!sdk|003| br : ',
  },
  {
    id: 'brite-webSDK-dev',
    name: 'Brain + *dev* !sdk|003| br',
    text: 'Read [root/ai/brain.md] then proceed;\n*dev* !sdk|003| br : ',
  },
  {
    id: 'brite-webSDK-ADMIN-auto',
    name: 'Brain + !ADMIN! *dev* !sdk|003| br',
    text: 'Read [root/ai/brain.md] then proceed;\n!ADMIN! *dev* !sdk|003| br : ',
  },
]
