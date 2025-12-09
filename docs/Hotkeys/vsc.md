# vsc

```ts
function Hotkeys.vsc(shortcut: string): Hotkey[]
```

Parses a VSCode-style hotkey string into normalized hotkeys. This is the most common format used in modern applications and is the default parser used by [`Hotkeys.bind`](./bind.md) when a string is provided.

## Syntax

- Single keys: `a`, `Enter`, `Escape`
- Modified keys: `ctrl+a`, `meta+shift+k`, `alt+ArrowDown`
- Sequences: `ctrl+k ctrl+b`, `g g`

Modifiers and keys are separated by `+`, and multiple hotkeys in a sequence are separated by whitespace.

## Modifiers

- `meta`: Meta key (Command on Mac, Windows key on PC)
- `ctrl`: Control key
- `alt`: Alt key
- `shift`: Shift key

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Parse ctrl+a
const hotkeys1 = Hotkeys.vsc("ctrl+a");
// Result: [{ ctrl: true, key: "a" }]

// Parse meta+shift+k
const hotkeys2 = Hotkeys.vsc("meta+shift+k");
// Result: [{ meta: true, key: "K" }]

// Parse sequence
const hotkeys3 = Hotkeys.vsc("ctrl+k ctrl+b");
// Result: [{ ctrl: true, key: "k" }, { ctrl: true, key: "b" }]

// Bind with vsc syntax (happens automatically with string input)
Hotkeys.bind("ctrl+k", () => console.log("Triggered!"));
```
