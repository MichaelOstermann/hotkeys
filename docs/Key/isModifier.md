# isModifier

```ts
function Key.isModifier(key: string): boolean
```

Checks if a key is any modifier key (Meta, Control, Alt, or Shift). The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases, then checked against all known modifiers.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isModifier("Meta")); // true
console.log(Key.isModifier("Control")); // true
console.log(Key.isModifier("Alt")); // true
console.log(Key.isModifier("Shift")); // true
console.log(Key.isModifier("ctrl")); // true (alias)
console.log(Key.isModifier("cmd")); // true (alias)
console.log(Key.isModifier("Enter")); // false
console.log(Key.isModifier("a")); // false
```
