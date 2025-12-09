# isAlt

```ts
function Key.isAlt(key: string): boolean
```

Checks if a key is the Alt modifier key. The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases, then checked against the canonical Alt key.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isAlt("Alt")); // true
console.log(Key.isAlt("alt")); // true
console.log(Key.isAlt("opt")); // true (alias for Alt)
console.log(Key.isAlt("option")); // true (alias for Alt)
console.log(Key.isAlt("Control")); // false
console.log(Key.isAlt("a")); // false
```
