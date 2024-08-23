# ComputerCraft IDE (ccIDE)
ccIDE is block based programming for ComputerCraft lua.

special thank for [ccblockly](https://github.com/Mirka1405/ccblockly) for idea

![Screenshot 2024-08-20 202018](https://github.com/user-attachments/assets/ba6c1ca6-ce91-41c9-b412-b1f3a8f2e735)

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

## official support library, peripheral and module function

### Module (CC) (15/42)
| Module | Status 
|------------|--------
| [_G](https://tweaked.cc/module/_G.html) | 🟩 Supported all
| [Disk](https://tweaked.cc/module/disk.html) | 🟩 Supported all
| [IO](https://tweaked.cc/module/io.html) (NativeIO) | 🟩 Supported all
| [Keys](https://tweaked.cc/module/keys.html) | 🟩 Supported all
| [OS](https://tweaked.cc/module/os.html) (System) | 🟩 Supported all
| [RedNet](https://tweaked.cc/module/rednet.html) | 🟩 Supported all
| [Settings](https://tweaked.cc/module/settings.html) | 🟩 Supported all
| [TextUtils](https://tweaked.cc/module/textutils.html) | 🟩 Supported all
| [Peripheral](https://tweaked.cc/module/peripheral.html) | 🟩 Supported all
| [Turtle](https://tweaked.cc/module/turtle.html) | 🟩 Supported all
| [Energy Storage Peripheral](https://tweaked.cc/generic_peripheral/energy_storage.html) | 🟩 Supported all
| [Fluid Storage Peripheral](https://tweaked.cc/generic_peripheral/fluid_storage.html) | 🟩 Supported all
| [Inventory](https://tweaked.cc/generic_peripheral/inventory.html) | 🟩 Supported all
| [Redstone](https://tweaked.cc/module/redstone.html) | 🟨 Partially Supported
| [Colors](https://tweaked.cc/module/colors.html) | 🟨 Partially Supported
| [Commands](https://tweaked.cc/module/commands.html) | 🟥 Unsupport
| [FS](https://tweaked.cc/module/fs.html) | 🟥 Unsupport
| [GPS](https://tweaked.cc/module/gps.html) | 🟥 Unsupport
| [Help](https://tweaked.cc/module/help.html) | 🟥 Unsupport
| [HTTP](https://tweaked.cc/module/http.html) (Network) | 🟥 Unsupport
| [Multishell](https://tweaked.cc/module/multishell.html) | 🟥 Unsupport
| [PaintUtils](https://tweaked.cc/module/paintutils.html) | 🟥 Unsupport
| [Parallel](https://tweaked.cc/module/parallel.html) | 🟥 Unsupport
| [Pocket](https://tweaked.cc/module/pocket.html) | 🟥 Unsupport
| [Shell](https://tweaked.cc/module/shell.html) | 🟥 Unsupport
| [Term](https://tweaked.cc/module/term.html) | 🟥 Unsupport
| [Vector](https://tweaked.cc/module/vector.html) | 🟥 Unsupport
| [Window](https://tweaked.cc/module/window.html) | 🟥 Unsupport
| [DFPWM Audio](https://tweaked.cc/library/cc.audio.dfpwm.html) | 🟥 Unsupport
| [Completion](https://tweaked.cc/library/cc.completion.html) | 🟥 Unsupport
| [Expect](https://tweaked.cc/library/cc.expect.html) | 🟥 Unsupport
| [NFT Image](https://tweaked.cc/library/cc.image.nft.html) | 🟥 Unsupport
| [Pretty](https://tweaked.cc/library/cc.pretty.html) | 🟥 Unsupport
| [Require](https://tweaked.cc/library/cc.require.html) | 🟥 Unsupport
| [Shell Completion](https://tweaked.cc/library/cc.shell.completion.html) | 🟥 Unsupport
| [Strings](https://tweaked.cc/library/cc.strings.html) | 🟥 Unsupport
| [Command Peripheral](https://tweaked.cc/peripheral/command.html) | 🟥 Unsupport
| [Computer Peripheral](https://tweaked.cc/peripheral/computer.html) | 🟥 Unsupport
| [Drive Peripheral](https://tweaked.cc/peripheral/drive.html) | 🟥 Unsupport
| [Modem Peripheral](https://tweaked.cc/peripheral/modem.html) | 🟥 Unsupport
| [Monitor Peripheral](https://tweaked.cc/peripheral/monitor.html) | 🟥 Unsupport
| [Printer Peripheral](https://tweaked.cc/peripheral/printer.html) | 🟥 Unsupport
| [Speaker Peripheral](https://tweaked.cc/peripheral/speaker.html) | 🟥 Unsupport

Event: https://tweaked.cc/event/alarm.html

### Peripheral mods (2/20)
| Mod | Status 
|------------|--------
|[Create Additions](https://www.curseforge.com/minecraft/mc-mods/createaddition) | 🟩 Supported all
|[Advanced Peripherals](https://www.curseforge.com/minecraft/mc-mods/advanced-peripherals) | 🟨 Partially Supported (9/13 Peripheral)
|[Create](https://www.curseforge.com/minecraft/mc-mods/create) | 🟨 Third support
|[CC:C Bridge](https://www.curseforge.com/minecraft/mc-mods/cccbridge) | 🟥 Unsupport
|[Extreme Reactors](https://www.curseforge.com/minecraft/mc-mods/extreme-reactors) ([Command](https://ftbwiki.org/Reactor_Computer_Port)) | 🟥 Unsupport
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

### Library (0/24)
| Library | Status |
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
