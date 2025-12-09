# aliases

```ts
const Key.aliases: Record<string, string>
```

A mapping of common key aliases to their canonical forms. This allows users to use shortened or alternative names for keys, which are automatically resolved to their standard representation.

## Available Aliases

- `' '` - Space
- **bksp** - Backspace
- **bs** - Backspace
- **caps** - CapsLock
- **cmd** - Meta
- **command** - Meta
- **cr** - Enter
- **ctrl** - Control
- **del** - Delete
- **down** - ArrowDown
- **downarrow** - ArrowDown
- **esc** - Escape
- **gt** - >
- **ins** - Insert
- **left** - ArrowLeft
- **leftarrow** - ArrowLeft
- **lt** - <
- **opt** - Alt
- **option** - Alt
- **pgdn** - PageDown
- **pgup** - PageUp
- **return** - Enter
- **right** - ArrowRight
- **rightarrow** - ArrowRight
- **spc** - Space
- **up** - ArrowUp
- **uparrow** - ArrowUp

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.aliases.esc); // "Escape"
console.log(Key.aliases.cmd); // "Meta"
console.log(Key.aliases.ctrl); // "Control"
console.log(Key.aliases.return); // "Enter"

// Aliases are automatically resolved when parsing
import { Hotkeys } from "@monstermann/hotkeys";

Hotkeys.bind("cmd+k", () => console.log("Triggered!"));
// Same as: Hotkeys.bind("meta+k", ...)
```
