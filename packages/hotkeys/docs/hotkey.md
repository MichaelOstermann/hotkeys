[← Getting Started](./getting-started.md) • [Registering Shortcuts →](./registering-shortcuts.md)

---

# Hotkey

As this library tries to be as unbiased and flexible as possible, it uses the following type to represent a keypress:

```ts
type Hotkey = Partial<{
    meta: boolean
    ctrl: boolean
    alt: boolean
    shift: boolean
    key: string
}>
```

Most utility functions expect you to pass in such a `Hotkey`, and they will store and use it as-is, meaning for example `{ key: 'A' } !== { key: 'a', shift: true }`.

While you are in control of how these hotkeys get constructed (including resolving aliases, normalising, supporting case-insensitivity, …), this library will for convenience provide goodies such as translating [VSCode/VIM](./registering-shortcuts.md) shortcuts and [native browser events](./executing-shortcuts.md) to those hotkeys!

## Reference

A list of utility functions related to `Hotkey`s:

### serializeHotkey

To ensure fast lookups and comparisons, `serializeHotkey` is used internally to convert `Hotkey`s to strings:

```ts
import { serializeHotkey } from '@monstermann/hotkeys'

// 'Meta+Space'
serializeHotkey({ meta: true, key: 'Space' })
```

### normalizeHotkey

This function does several cleanups:

- Maps `{ key: 'Control' }` to `{ ctrl: true }`
- Maps `{ shift: true, key: 'a' }` to `{ key: 'A' }`
- Maps `{ alt: true, key: '@' }` to `{ key: '@' }`
- Removes empty fields such as `{ meta: true, shift: false, key: '' }` to `{ meta: true }`

```ts
import { normalizeHotkey } from '@monstermann/hotkeys'

// { key: 'A' }
normalizeHotkey({ shift: true, key: 'a' })
```

### modifierKeys

A record containing a mapping of modifier keys:

```ts
import { modifierKeys } from '@monstermann/hotkeys'

modifierKeys.meta // 'Meta'
modifierKeys.ctrl // 'Control'
modifierKeys.alt // 'Alt'
modifierKeys.shift // 'Shift'
```

### specialKeys

A record containing "special" keys such as `enter` or `space`:

```ts
import { specialKeys } from '@monstermann/hotkeys'

specialKeys.enter // 'Enter'
specialKeys.space // 'Space'
specialKeys.arrowdown // 'ArrowDown'
specialkeys.f10 // 'F10'
```

### aliasKeys

A record containing common aliases to either `modifierKeys` or `specialKeys`:

```ts
import { aliasKeys } from '@monstermann/hotkeys'

aliasKeys.cmd // 'Meta'
aliasKeys.command // 'Meta'
aliasKeys.left // 'ArrowLeft'
aliasKeys.return // 'Enter'
```

### resolveKey

A function that resolves a `key: string` by looking at `modifierKeys`, `specialKeys` and `aliasKeys`, while covering for case-insensitivity.

Returns the original input if no matching mapping was found:

```ts
import { resolveKey } from '@monstermann/hotkeys'

resolveKey('meta') // 'Meta' from modifierKeys
resolveKey('space') // 'Space' from specialKeys
resolveKey('cmd') // 'Meta' from aliasKeys
resolveKey('a') // 'a' as it matched nothing else
```

### isModifierKey

A function that tells you whether a given `key: string` is a modifier. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isModifierKey } from '@montermann/hotkeys'

isModifierKey('meta') // true
isModifierKey('cmd') // true
isModifierKey('a') // false
```

### isSpecialKey

A function that tells you whether a given `key: string` is a special key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isSpecialKey } from '@montermann/hotkeys'

isSpecialKey('enter') // true
isSpecialKey('left') // true
isSpecialKey('a') // false
```

### isPlainKey

A function that tells you whether a given `key: string` is neither a modifier nor a special key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isPlainKey } from '@montermann/hotkeys'

isPlainKey('enter') // false
isPlainKey('cmd') // false
isPlainKey('a') // true
isPlainKey('1') // true
isPlainKey('/') // true
```

### isMetaKey

A function that tells you whether a given `key: string` is a meta key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isMetaKey } from '@montermann/hotkeys'

isMetaKey('meta') // true
isMetaKey('cmd') // true
isMetaKey('a') // false
```

### isCtrlKey

A function that tells you whether a given `key: string` is a control key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isCtrlKey } from '@montermann/hotkeys'

isCtrlKey('ctrl') // true
isCtrlKey('control') // true
isCtrlKey('a') // false
```

### isAltKey

A function that tells you whether a given `key: string` is an alt key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isAltKey } from '@montermann/hotkeys'

isAltKey('alt') // true
isAltKey('option') // true
isAltKey('a') // false
```

### isShiftKey

A function that tells you whether a given `key: string` is a shift key. Note that `resolveKey` is used internally, so for example aliases are covered:

```ts
import { isShiftKey } from '@montermann/hotkeys'

isShiftKey('shift') // true
isShiftKey('a') // false
```

---

[← Getting Started](./getting-started.md) • [Registering Shortcuts →](./registering-shortcuts.md)
