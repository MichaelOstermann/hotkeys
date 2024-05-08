[← Registering Shortcuts](./registering-shortcuts.md) • [Sequences →](./sequences.md)

---

# Executing Shortcuts

## Translating Events

Firstly this library makes no assumptions about where keyboard events are coming from.

You will have to:

- Attach your own `document.addEventListener('keydown')` in browser environments
- Wire things with `useInput()` when using [`ink`](https://github.com/vadimdemedes/ink)
- Wire things with `terminal.on('keypress')` when using [`tty-events`](https://github.com/dd-pardal/tty-events).

Your goal would then be to translate their respective keypress representation to a [`Hotkey`](./hotkey.md), for which you can use existing helpers such as [`aliasKeys`](./hotkey.md#aliaskeys) or [`isCtrlKey`](./hotkey.md#isctrlkey).

### Browsers

For browser environments, you can use the existing `eventToHotkey` helper:

```ts
import { eventToHotkey } from '@monstermann/hotkeys'

document.addEventListener('keydown', (event) => {
    const hotkey = eventToHotkey(event)
})
```

If it happens to be insufficient, you can build your own!

### Alternative Environments

To give you an example of what it might look like to build your own, here is a reference implementation for [`tty-events`](https://github.com/dd-pardal/tty-events):

```ts
import type Terminal from 'tty-events'
import type { Hotkey } from '@monstermann/hotkeys'
import { normalizeHotkey, resolveKey } from '@monstermann/hotkeys'

export function eventToHotkey(event: Terminal.KeyboardEvent): Hotkey {
    return normalizeHotkey({
        ctrl: event.ctrl,
        alt: event.alt,
        shift: event.shift,
        key: resolveKey(event.name),
    })
}
```

Which you can use like so:

```ts
import Term from 'tty-events'

const term = new Term()

term.on('keypress', (event) => {
    const hotkey = eventToHotkey(event)
})
```

## Matching Bindings

Once you have a `Hotkey` available, either manually constructed or from an event as shown above, you can now retrieve a list of matching bindings.

You can do so using any of the builtin utility functions such as [`getExactBindings`](#getexactbindings), or you can do that yourself using a provided [iterator](#bindings):

```ts
import { createHotkeys, eventToHotkey, getExactBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

// Register bindings…

document.addEventListener('keydown', (event) => {
    const hotkey = eventToHotkey(event)
    // Retrieve a list of bindings that match exactly:
    const bindings = getExactBindings(hotkeys, [hotkey])
})
```

You can now run additional `bindings.filter(…)` if you wish!

## Executing Bindings

Once you have a list of bindings, you can execute their callbacks:

```ts
import { createHotkeys, eventToHotkey, getExactBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

document.addEventListener('keydown', (event) => {
    const hotkey = eventToHotkey(event)
    const bindings = getExactBindings(hotkeys, [hotkey])

    bindings.forEach(binding => binding.callback())
})
```

## Reference

### eventToHotkey

Translates a [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) to a `Hotkey`:

```ts
import { eventToHotkey } from '@monstermann/hotkeys'

document.addEventListener('keydown', (event) => {
    const hotkey = eventToHotkey(event)
})
```

### hasExactBindings

Returns a boolean indicating whether the given sequence of Hotkeys has any exactly matching bindings:

```ts
import { addBindings, createHotkeys, hasExactBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

addBindings(hotkeys, [
    { hotkeys: [{ key: '1' }], callback, context },
    { hotkeys: [{ key: '2' }, { key: '3' }], callback, context },
])

hasExactBindings(hotkeys, [{ key: '1' }]) // true
hasExactBindings(hotkeys, [{ key: '2' }]) // false
hasExactBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // true
```

### hasPartialBindings

Returns a boolean indicating whether the given sequence of Hotkeys has any partially matching bindings:

```ts
import { addBindings, createHotkeys, hasPartialBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

addBindings(hotkeys, [
    { hotkeys: [{ key: '1' }], callback, context },
    { hotkeys: [{ key: '2' }, { key: '3' }], callback, context },
])

hasPartialBindings(hotkeys, [{ key: '1' }]) // false
hasPartialBindings(hotkeys, [{ key: '2' }]) // true
hasPartialBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // false
```

### hasBindings

Returns a boolean indicating whether the given sequence of Hotkeys has any matching bindings:

```ts
import { addBindings, createHotkeys, hasBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

addBindings(hotkeys, [
    { hotkeys: [{ key: '1' }], callback, context },
    { hotkeys: [{ key: '2' }, { key: '3' }], callback, context },
])

hasBindings(hotkeys, [{ key: '1' }]) // true
hasBindings(hotkeys, [{ key: '2' }]) // true
hasBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // true
hasBindings(hotkeys, [{ key: '4' }]) // false
```

### getExactBindings

Retrieves a list of exactly matching bindings for the given sequence of Hotkeys:

```ts
import { addBindings, createHotkeys, getExactBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const bindingA = { hotkeys: [{ key: '1' }], callback, context }
const bindingB = { hotkeys: [{ key: '2' }, { key: '3' }], callback, context }
addBindings(hotkeys, [bindingA, bindingB])

getExactBindings(hotkeys, [{ key: '1' }]) // [bindingA]
getExactBindings(hotkeys, [{ key: '2' }]) // []
getExactBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // [bindingB]
```

### getPartialBindings

Retrieves a list of partially matching bindings for the given sequence of Hotkeys:

```ts
import { addBindings, createHotkeys, getPartialBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const bindingA = { hotkeys: [{ key: '1' }], callback, context }
const bindingB = { hotkeys: [{ key: '2' }, { key: '3' }], callback, context }
addBindings(hotkeys, [bindingA, bindingB])

getPartialBindings(hotkeys, [{ key: '1' }]) // []
getPartialBindings(hotkeys, [{ key: '2' }]) // [bindingB]
getPartialBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // []
```

### getAllBindings

Retrieves a list of any matching bindings for the given sequence of Hotkeys:

```ts
import { addBindings, createHotkeys, getAllBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const bindingA = { hotkeys: [{ key: '1' }], callback, context }
const bindingB = { hotkeys: [{ key: '2' }, { key: '3' }], callback, context }
addBindings(hotkeys, [bindingA, bindingB])

getAllBindings(hotkeys, [{ key: '1' }]) // [bindingA]
getAllBindings(hotkeys, [{ key: '2' }]) // [bindingA, bindingB]
getAllBindings(hotkeys, [{ key: '2' }, { key: '3' }]) // [bindingB]
```

The second parameter can be omitted to get all bindings:

```ts
getAllBindings(hotkeys) // [bindingA, bindingB]
```

### bindings

Returns a generator that can be used to iterate over bindings:

```ts
import { bindings, createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

for (const binding of bindings(hotkeys.shortcuts))
    console.log(binding)
```

---

[← Registering Shortcuts](./registering-shortcuts.md) • [Sequences →](./sequences.md)
