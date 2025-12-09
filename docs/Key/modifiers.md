# modifiers

```ts
const Key.modifiers: {
    meta: "Meta"
    Meta: "Meta"
    control: "Control"
    Control: "Control"
    alt: "Alt"
    Alt: "Alt"
    shift: "Shift"
    Shift: "Shift"
}
```

A key map containing all modifier keys in their canonical form. Both lowercase and original case keys are supported for case-insensitive lookups.

The modifier keys are:

- **Meta**: Command key on Mac, Windows key on PC
- **Control**: Control key
- **Alt**: Alt/Option key
- **Shift**: Shift key

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.modifiers.meta); // "Meta"
console.log(Key.modifiers.Meta); // "Meta"
console.log(Key.modifiers.control); // "Control"
console.log(Key.modifiers.Control); // "Control"

// Check if a key is a modifier
const key = "Control";
const isModifier = key in Key.modifiers;
console.log(isModifier); // true
```
