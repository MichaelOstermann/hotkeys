# isCtrl

```ts
function Key.isCtrl(key: string): boolean
```

Checks if a key is the Control modifier key. The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases, then checked against the canonical Control key.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isCtrl("Control")); // true
console.log(Key.isCtrl("control")); // true
console.log(Key.isCtrl("ctrl")); // true (alias for Control)
console.log(Key.isCtrl("Meta")); // false
console.log(Key.isCtrl("c")); // false
```
