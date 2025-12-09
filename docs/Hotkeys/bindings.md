# bindings

```ts
const Hotkeys.bindings: Set<Binding>
```

A Set containing all currently registered hotkey bindings. Each binding contains a hotkey sequence and its associated callback function.

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Register a binding
Hotkeys.bind("ctrl+a", () => console.log("Triggered!"));

// Check the bindings
console.log(Hotkeys.bindings.size); // 1

// Iterate over bindings
for (const binding of Hotkeys.bindings) {
    console.log(binding.hotkeys, binding.callback);
}
```
