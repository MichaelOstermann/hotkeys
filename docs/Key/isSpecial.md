# isSpecial

```ts
function Key.isSpecial(key: string): boolean
```

Checks if a key is a special (non-alphanumeric) key. Special keys include navigation keys (arrows, Home, End), function keys (F1-F24), editing keys (Enter, Backspace, Delete), and other non-character keys. The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases.

See [`Key.special`](./special.md) for the complete list of special keys.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isSpecial("Enter")); // true
console.log(Key.isSpecial("Escape")); // true
console.log(Key.isSpecial("ArrowUp")); // true
console.log(Key.isSpecial("F1")); // true
console.log(Key.isSpecial("esc")); // true (alias)
console.log(Key.isSpecial("a")); // false
console.log(Key.isSpecial("Control")); // false (modifier, not special)
```
