# isExactMatch

```ts
function Hotkeys.isExactMatch(
    a: Hotkey[] | string,
    b: Hotkey[] | string
): boolean
```

Checks if two hotkey sequences are exactly equal. Accepts either hotkey arrays or strings (which are parsed via [`Hotkeys.vsc`](./vsc.md)). The comparison is done by serializing both sequences and comparing the resulting strings.

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Compare strings
const match1 = Hotkeys.isExactMatch("ctrl+a", "ctrl+a");
// Result: true

const match2 = Hotkeys.isExactMatch("ctrl+a", "ctrl+b");
// Result: false

// Compare hotkey arrays
const match3 = Hotkeys.isExactMatch(
    [{ ctrl: true, key: "a" }],
    [{ ctrl: true, key: "a" }],
);
// Result: true

// Compare sequences
const match4 = Hotkeys.isExactMatch("ctrl+k ctrl+b", "ctrl+k ctrl+b");
// Result: true

// Mixed comparison
const match5 = Hotkeys.isExactMatch("ctrl+a", [{ ctrl: true, key: "a" }]);
// Result: true
```
