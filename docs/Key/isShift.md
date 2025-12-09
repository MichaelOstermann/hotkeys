# isShift

```ts
function Key.isShift(key: string): boolean
```

Checks if a key is the Shift modifier key. The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases, then checked against the canonical Shift key.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isShift("Shift")); // true
console.log(Key.isShift("shift")); // true
console.log(Key.isShift("Control")); // false
console.log(Key.isShift("s")); // false
```
