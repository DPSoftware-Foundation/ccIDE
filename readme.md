# ComputerCraft IDE (ccIDE)
ccIDE is block based programming for ComputerCraft lua.

special thank for [ccblockly](https://github.com/Mirka1405/ccblockly) for idea

![image](https://github.com/user-attachments/assets/599c9ebe-66ca-445d-94da-4216cb57e918)

# Quick Start
1. install nodejs and git
2. git clone cd to this project 
3. Install dependency use `npm install .`
4. To run this IDE use `npm run dev` or if you using windows you can use `run.bat` to run it.
5. Done!

## Install Remote code into computercraft
it very simple! to install Remote code.
### Run from URL
for advanced computer/pocket/turtle
```
wget run https://raw.githubusercontent.com/DPSoftware-Foundation/ccIDE/main/advremote.lua
```
for non advance computer/pocket/turtle
```
wget run https://raw.githubusercontent.com/DPSoftware-Foundation/ccIDE/main/remote.lua
```
### Download and Run
for advanced computer/pocket/turtle
```
wget https://raw.githubusercontent.com/DPSoftware-Foundation/ccIDE/main/advremote.lua advremote.lua
advremote
```
for non advanced computer/pocket/turtle
```
wget https://raw.githubusercontent.com/DPSoftware-Foundation/ccIDE/main/remote.lua remote.lua
remote
```
If error "Domain not permitted" try [this solution](https://github.com/cc-tweaked/CC-Tweaked/discussions/626#discussioncomment-241924).

## official support library and peripheral
### Peripheral mods
| Mod | Status 
|------------|--------
|[Advanced Peripherals](https://www.curseforge.com/minecraft/mc-mods/advanced-peripherals) | 🟨 First support
|[CC:C Bridge](https://www.curseforge.com/minecraft/mc-mods/cccbridge) | 🟥 Unsupport
|[CC:Destroy Bridge](https://www.curseforge.com/minecraft/mc-mods/ccdbridge) | 🟥 Unsupport
|[More Red x CC:Tweaked Compat](https://www.curseforge.com/minecraft/mc-mods/more-red-x-cc-tweaked-compat) | 🟥 Unsupport
|[More Peripherals](https://www.curseforge.com/minecraft/mc-mods/more-peripherals) | 🟥 Unsupport
|[Tom's Peripherals](https://www.curseforge.com/minecraft/mc-mods/toms-peripherals) | 🟥 Unsupport
|[Computer Cartographer](https://modrinth.com/mod/computer-cartographer) | 🟥 Unsupport
|[Peripheralium](https://modrinth.com/mod/peripheralium) | 🟥 Unsupport
|[Unlimited Peripheral Works](https://modrinth.com/mod/unlimitedperipheralworks) | 🟥 Unsupport
|[CTOV](https://modrinth.com/datapack/ctov-advanced-peripheral-compat) | 🟥 Unsupport
|[Digital Items 3](https://modrinth.com/mod/digital-items-3) | 🟥 Unsupport
|[SirEdvin's Cloud Solutions](https://modrinth.com/mod/cloud-solutions) | 🟥 Unsupport
|[CC: VS](https://modrinth.com/mod/cc-vs) | 🟥 Unsupport
|[CC Shops](https://modrinth.com/mod/cc-shops) | 🟥 Unsupport
|[SwitchCraft Peripherals](https://www.curseforge.com/minecraft/mc-mods/sc-peripherals) | 🟥 Unsupport (Old version)
|[Plethora Peripherals](https://www.curseforge.com/minecraft/mc-mods/plethora-peripherals) | 🟥 Unsupport (Fabric only)
|[Some Peripherals](https://modrinth.com/mod/some-peripherals) | 🟥 Unsupport (Fabric only)

### Library
| Mod | Status |
|------------|--------|
| [Acidity](https://github.com/9551-Dev/acidity) | 🟥 Unsupport |
| [Anavrins' ChaCha20](https://web.archive.org/web/20200924232302/http://www.computercraft.info/forums2/index.php?/topic/25474-chacha20-encryption-in-computercraft/) ([pastebin](https://pastebin.com/GPzf9JSa)) | 🟥 Unsupport |
| [Anavrins' MD5](https://pastebin.com/6PVSRckQ) | 🟥 Unsupport |
| [Anavrins' SHA-1](https://pastebin.com/SfL7vxP3) | 🟥 Unsupport |
| [Anavrins' SHA-256](https://web.archive.org/web/20230211193054/http://www.computercraft.info/forums2/index.php?/topic/8169-sha-256-in-pure-lua/) ([pastebin](https://pastebin.com/gsFrNjbt)) | 🟥 Unsupport |
| [AUKit](https://mcjack123.github.io/AUKit/) | 🟥 Unsupport |
| [Basalt](https://basalt.madefor.cc/) | 🟥 Unsupport |
| [Bigfont](https://pastebin.com/3LfWxRWh) | 🟥 Unsupport |
| [C3D](https://c3d.madefor.cc/) | 🟥 Unsupport |
| [CC-Archive](https://github.com/MCJack123/CC-Archive) | 🟥 Unsupport |
| [dbprotect](https://gist.github.com/MCJack123/4cf6fc941a2d412b4195caafb9636363) | 🟥 Unsupport |
| [ecc.lua](https://web.archive.org/web/20190808224502/http://www.computercraft.info/forums2/index.php?/topic/29803-elliptic-curve-cryptography/) ([pastebin](https://pastebin.com/ZGJGBJdg)) | 🟥 Unsupport |
| [ecnet](https://github.com/migeyel/ecnet) | 🟥 Unsupport |
| [GuiH](https://guih.madefor.cc) | 🟥 Unsupport |
| [IsometriH](https://github.com/9551-Dev/IsometriH) | 🟥 Unsupport |
| [Luz](https://github.com/MCJack123/Luz) | 🟥 Unsupport |
| [Milo](https://github.com/kepler155c/opus-apps/wiki/Milo-(crafting---storage-system)) | 🟥 Unsupport |
| [Pine3D](https://github.com/Xella37/Pine3D) | 🟥 Unsupport |
| [PngLua](https://github.com/9551-Dev/pngLua) | 🟥 Unsupport |
| [Pixelbox Lite](https://github.com/9551-Dev/pixelbox_lite) | 🟥 Unsupport |
| [RedRun](https://gist.github.com/MCJack123/473475f07b980d57dd2bd818026c97e8) | 🟥 Unsupport |
| [Tamperer](https://github.com/Fatboychummy-CC/Tamperer) | 🟥 Unsupport |
| [Tampl](https://github.com/9551-Dev/tampl) | 🟥 Unsupport |
| [Telem](https://telem.cc) | 🟥 Unsupport |
| [VeriCode](https://gist.github.com/MCJack123/7752c85918bcf23ada028abd615e8750) | 🟥 Unsupport |


# Some small developer media
[![wakatime](https://wakatime.com/badge/user/0e729f00-081a-41e0-ab17-b9ac6abfc334/project/e9e0d6a6-dfaf-46d0-bb77-e1f7127e7fb4.svg)](https://wakatime.com/badge/user/0e729f00-081a-41e0-ab17-b9ac6abfc334/project/e9e0d6a6-dfaf-46d0-bb77-e1f7127e7fb4)

https://github.com/user-attachments/assets/8e9564fc-fc85-4ff6-b23a-357d3ac5f33c

https://github.com/user-attachments/assets/195231d4-8fd8-4101-8068-70bc038a5c4f

https://github.com/user-attachments/assets/8f114cfa-d87c-47d0-a670-a13dc975ab06

# For adapting in other project
This project is based for every block based IDE from DPSoftware Foundation

# License 
This project is licensed under the [GPL v3 License](https://github.com/DPSoftware-Foundation/ccIDE/blob/main/LICENSE).
