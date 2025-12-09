# serialize

```ts
function Hotkeys.serialize(hotkeys: Hotkey[]): string
```

Converts an array of hotkeys into a string representation. The hotkeys are first normalized, then each hotkey is converted to a string format with modifiers and keys joined by `+`. Multiple hotkeys in a sequence are joined by spaces.

The modifier order is: `meta+ctrl+alt+shift+key`

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Serialize a single hotkey
const str1 = Hotkeys.serialize([{ ctrl: true, key: "a" }]);
// Result: "ctrl+a"

// Serialize with multiple modifiers
const str2 = Hotkeys.serialize([{ meta: true, shift: true, key: "k" }]);
// Result: "meta+K"

// Serialize a sequence
const str3 = Hotkeys.serialize([
    { ctrl: true, key: "k" },
    { ctrl: true, key: "b" },
]);
// Result: "ctrl+k ctrl+b"
```
