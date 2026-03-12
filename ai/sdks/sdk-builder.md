# SDK builder — structure and systemUpdates

## expected SDK structure

sdk-name-brain-block.md | variables.br | functions.br | install.br | sdk-guide.txt

## systemUpdates in SDKs

Each SDK should include:
- **systemUpdates** — function that applies syntax updates from a version file
- **sdk-syntax-update.md** — template dropped into SDK root. user places br-v-X-X.md from main lang/versions/ here, then runs: !sdk|###| br : { run; <systemUpdates>; [root/ai/sdks/sdk-name/br-v-X-X.md] } :

The SDK's systemUpdates reads the file, applies the SDK section only, updates SDK .br files per instructions. If SDK contains plugins, update plugins per PLUGIN section.

After SDK update: if user-input changes were made, ask "Would you like an updated SDK guide?"
