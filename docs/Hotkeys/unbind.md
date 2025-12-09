# unbind

```ts
function Hotkeys.unbind(
    hotkeys: Hotkey[] | string,
    callback?: () => void
): void
```

Removes hotkey bindings. If a callback is provided, only removes bindings with that specific callback. If no callback is provided, removes all bindings for the given hotkey sequence. If a string is passed, it is parsed via [`Hotkeys.vsc`](./vsc.md) first.

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

const callback1 = () => console.log("Callback 1");
const callback2 = () => console.log("Callback 2");

// Bind multiple callbacks to the same hotkey
Hotkeys.bind("ctrl+a", callback1);
Hotkeys.bind("ctrl+a", callback2);

// Unbind a specific callback
Hotkeys.unbind("ctrl+a", callback1);
// Only callback2 remains bound

// Unbind all callbacks for a hotkey
Hotkeys.unbind("ctrl+a");
// No callbacks remain bound

// Alternative: use the dispose function returned by bind
const dispose = Hotkeys.bind("ctrl+b", () => console.log("Triggered!"));
dispose(); // Same as calling unbind with the specific callback
```
