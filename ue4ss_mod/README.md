# CodeRevealer

> Prints the Payday 3 door/vault code combination to the UE4SS console.

Thanks to [fm666venom](https://www.unknowncheats.me/forum/payday-3-a/614083-code-doors-vault.html) at UnknownCheats for the code. I'm just hosting it here as a standalone mod.

## Installation

1. Install [UE4SS](https://modworkshop.net/mod/47771).
2. Download the latest release of `CodeRevealer.zip` from the [releases](https://github.com/SavageCore/pd3-vault-cracker/releases/latest/download/CodeRevealer.zip).
3. Extract the contents of the archive to the mods folder `PAYDAY3\PAYDAY3\Binaries\Win64\Mods`. You should now have a CodeRevealer folder containing a blank `enabled.txt` file and a `Scripts` folder with the `main.lua` file.
4. Enable the console in UE4SS. To do this, edit the `UE4SS-settings.ini` file in the UE4SS folder and set either `ConsoleEnabled` or both `GuiConsoleEnabled` and `GuiConsoleVisible` to `1`. For example:

```ini
ConsoleEnabled = 0
GuiConsoleEnabled = 1
GuiConsoleVisible = 1
```

5. Start the game and a console window or GUI console should now launch alongside it. Once you start a heist, the door/vault code combination will be printed to the console.
