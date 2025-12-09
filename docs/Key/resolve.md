# resolve

```ts
function Key.resolve(key: string): string
```

Resolves a key string to its canonical form. This function checks the key against modifiers, special keys, and aliases in that order. If the key is not found in any of these maps, it checks again with a lowercase version. If still not found, the original key is returned.

The resolution order is:

1. Check exact match in modifiers, special keys, and aliases
2. Check lowercase match in modifiers, special keys, and aliases
3. Return the original key if no match found

This function is used internally by all other Key utilities to normalize key input.

## Example

```ts
import { Key } from "@monstermann/hotkeys";

// Resolve aliases
console.log(Key.resolve("esc")); // "Escape"
console.log(Key.resolve("cmd")); // "Meta"
console.log(Key.resolve("ctrl")); // "Control"
console.log(Key.resolve("return")); // "Enter"

// Case-insensitive resolution
console.log(Key.resolve("enter")); // "Enter"
console.log(Key.resolve("Enter")); // "Enter"
console.log(Key.resolve("ENTER")); // "Enter"

// Plain keys pass through
console.log(Key.resolve("a")); // "a"
console.log(Key.resolve("Z")); // "Z"
console.log(Key.resolve("@")); // "@"
```
