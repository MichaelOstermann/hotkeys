# vim

```ts
function Hotkeys.vim(shortcut: string): Hotkey[]
```

Parses a vim-style hotkey string into normalized hotkeys. Supports vim's key notation format where keys can be wrapped in angle brackets with modifiers.

## Syntax

- Plain keys: `a`, `g`, `j`, `k`
- Modified keys: `<C-a>`, `<D-S-k>`, `<M-x>`
- Sequences: `gg`, `<C-w>v`

## Modifiers

- `D-` or `d-`: Meta key (Command on Mac, Windows key on PC)
- `C-` or `c-`: Control key
- `A-` or `M-` or `a-` or `m-`: Alt key
- `S-` or `s-`: Shift key

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Parse ctrl+a
const hotkeys1 = Hotkeys.vim("<C-a>");
// Result: [{ ctrl: true, key: "a" }]

// Parse meta+shift+k
const hotkeys2 = Hotkeys.vim("<D-S-k>");
// Result: [{ meta: true, key: "K" }]

// Parse sequence
const hotkeys3 = Hotkeys.vim("gg");
// Result: [{ key: "g" }, { key: "g" }]

// Bind with vim syntax
Hotkeys.bind(Hotkeys.vim("<C-k>"), () => console.log("Triggered!"));
```
