# isMeta

```ts
function Key.isMeta(key: string): boolean
```

Checks if a key is the Meta modifier key (Command on Mac, Windows key on PC). The key is first resolved through [`Key.resolve`](./resolve.md) to handle aliases, then checked against the canonical Meta key.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.isMeta("Meta")); // true
console.log(Key.isMeta("meta")); // true
console.log(Key.isMeta("cmd")); // true (alias for Meta)
console.log(Key.isMeta("command")); // true (alias for Meta)
console.log(Key.isMeta("Control")); // false
console.log(Key.isMeta("m")); // false
```
