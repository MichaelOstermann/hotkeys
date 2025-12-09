# evt

```ts
function Hotkeys.evt(event: KeyboardEvent): Hotkey[]
```

Converts a keyboard event into a normalized hotkey array. Extracts the modifier keys (alt, ctrl, meta, shift) and the pressed key from the event, then normalizes the result.

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

document.addEventListener("keydown", (event) => {
    const hotkeys = Hotkeys.evt(event);
    console.log(hotkeys);
    // Example output: [{ ctrl: true, key: "a" }]

    const str = Hotkeys.serialize(hotkeys);
    console.log(str);
    // Example output: "ctrl+a"
});
```
