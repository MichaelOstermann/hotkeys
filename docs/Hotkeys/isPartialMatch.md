# isPartialMatch

```ts
function Hotkeys.isPartialMatch(
    a: Hotkey[] | string,
    b: Hotkey[] | string
): boolean
```

Checks if `b` is a partial match of `a`. This is useful for detecting when a user is in the middle of typing a multi-key sequence. Returns `true` if `b` matches the beginning of `a` and is shorter than `a`.

Accepts either hotkey arrays or strings (which are parsed via [`Hotkeys.vsc`](./vsc.md)).

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Check if "ctrl+k" is a partial match of "ctrl+k ctrl+b"
const match1 = Hotkeys.isPartialMatch("ctrl+k ctrl+b", "ctrl+k");
// Result: true

// Check if "ctrl+k ctrl+b" is a partial match of "ctrl+k"
const match2 = Hotkeys.isPartialMatch("ctrl+k", "ctrl+k ctrl+b");
// Result: false (b is not shorter than a)

// Check if "ctrl+a" is a partial match of "ctrl+k ctrl+b"
const match3 = Hotkeys.isPartialMatch("ctrl+k ctrl+b", "ctrl+a");
// Result: false (doesn't match the beginning)

// Practical usage: prevent default for partial matches
document.addEventListener("keydown", (event) => {
    const pressed = Hotkeys.evt(event);

    for (const binding of Hotkeys.bindings) {
        if (Hotkeys.isPartialMatch(binding.hotkeys, pressed)) {
            // Don't execute yet, waiting for more keys
            event.preventDefault();
            break;
        }
    }
});
```
