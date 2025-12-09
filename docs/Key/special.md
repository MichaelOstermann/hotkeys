# special

```ts
const Key.special: Record<string, string>
```

A key map containing all special (non-alphanumeric) keys in their canonical form. Both lowercase and original case keys are supported for case-insensitive lookups.

Special keys include navigation keys, function keys, numpad keys, and other non-character keys as defined by the [MDN UI Events specification](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).

## Categories

**Navigation**: ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home, PageDown, PageUp

**Editing**: Backspace, Delete, Enter, Insert, Space, Tab

**Function**: F1-F24

**Numpad**: Numpad0-Numpad9, NumpadAdd, NumpadComma, NumpadDecimal, NumpadDivide, NumpadEnter, NumpadEqual, NumpadMultiply, NumpadSubtract

**Lock**: CapsLock, NumLock, ScrollLock

**Other**: Clear, Escape

## Example

```ts
import { Key } from "@monstermann/hotkeys";

console.log(Key.special.enter); // "Enter"
console.log(Key.special.Enter); // "Enter"
console.log(Key.special.escape); // "Escape"
console.log(Key.special.arrowup); // "ArrowUp"

// Check if a key is special
const key = "Enter";
const isSpecial = key in Key.special;
console.log(isSpecial); // true

const plainKey = "a";
const isPlain = !(plainKey in Key.special);
console.log(isPlain); // true
```
