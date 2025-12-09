# isPlain

```ts
function Key.isPlain(key: string): boolean
```

Checks if a key is a plain key. A plain key is one that is neither a modifier key (Meta, Control, Alt, Shift) nor a special key (Enter, Escape, arrow keys, etc.). Plain keys are typically alphanumeric characters and symbols.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isPlain("a")); // true
console.log(Key.isPlain("Z")); // true
console.log(Key.isPlain("5")); // true
console.log(Key.isPlain("@")); // true
console.log(Key.isPlain("Control")); // false (modifier)
console.log(Key.isPlain("Meta")); // false (modifier)
console.log(Key.isPlain("Enter")); // false (special)
console.log(Key.isPlain("Escape")); // false (special)
```
