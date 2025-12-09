# normalize

```ts
function Hotkeys.normalize(hotkeys: Hotkey[]): Hotkey[]
```

Normalizes an array of hotkeys by applying standardization rules. This includes resolving key aliases, normalizing modifier keys, handling shift key combinations, and cleaning up properties.

The normalization process:

1. **Resolve aliases**: Converts key aliases to their canonical form (e.g., "esc" → "Escape")
2. **Normalize modifiers**: If the key itself is a modifier (Meta, Ctrl, Alt, Shift), moves it to the appropriate modifier property
3. **Normalize shift**: For plain keys with shift modifier, uppercases the key and removes the shift flag (e.g., `{shift: true, key: "a"}` → `{key: "A"}`)
4. **Normalize alt**: Sets `alt` to `false` for plain keys
5. **Clean properties**: Removes falsy values from the hotkey object

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

// Normalize with shift key
const normalized1 = Hotkeys.normalize([{ shift: true, key: "a" }]);
// Result: [{ key: "A" }]

// Normalize modifier as key
const normalized2 = Hotkeys.normalize([{ key: "Control" }]);
// Result: [{ ctrl: true }]

// Resolve alias
const normalized3 = Hotkeys.normalize([{ key: "esc" }]);
// Result: [{ key: "Escape" }]
```
