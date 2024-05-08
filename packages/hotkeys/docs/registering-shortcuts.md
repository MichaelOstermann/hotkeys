[← Hotkey](./hotkey.md) • [Executing Shortcuts →](./executing-shortcuts.md)

---

# Registering Shortcuts

Shortcuts are roughly represented as:

```ts
type Binding = {
    hotkeys: Hotkey[]
    callback: Function
    context: object
}
```

For which there are basic utility functions, such as adding and removing them:

```ts
import { addBinding, createHotkeys, removeBinding } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const binding = {
    hotkeys: [{ meta: true, key: 'a' }],
    callback: () => console.log('Hello world!'),
    context: {},
}

addBinding(hotkeys, binding)
removeBinding(hotkeys, binding)
```

As this is most definitely not the most ergonomic way to manage shortcuts, you probably want to build abstractions around those.

However this library comes with two out-of-the-box ones that can be imported separately, which should cover most if not all of your needs:

## VSCode

```ts
import { parseShortcut } from '@monstermann/hotkeys/vscode'

// [{ ctrl: true, key: 'k' }, { ctrl: true, key: 'a' }]
parseShortcut('ctrl+k ctrl+a')
```

```ts
import { addBinding, addBindings, createHotkeys } from '@monstermann/hotkeys'
import { addShorcut, addShortcuts, createBinding, createBindings } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys()

// Create bindings (no side-effects):

const binding = createBinding(hotkeys, 'ctrl+k ctrl+a', callback)
addBinding(binding)

const bindings = createBindings(hotkeys, ['meta+left', 'home'], callback)
addBindings(bindings)

// Create and add bindings in one go:

const binding = addShortcut(hotkeys, 'ctrl+k ctrl+a', callback)
const bindings = addShortcuts(hotkeys, ['meta+left', 'home'], callback)
```

## VIM

```ts
import { parseShortcut } from '@monstermann/hotkeys/vim'

// [{ ctrl: true, key: 'k' }, { ctrl: true, key: 'a' }]
parseShortcut('<c-k><c-a>')
```

```ts
import { addBinding, addBindings, createHotkeys } from '@monstermann/hotkeys'
import { addShorcut, addShortcuts, createBinding, createBindings } from '@monstermann/hotkeys/vim'

const hotkeys = createHotkeys()

// Create bindings (no side-effects):

const binding = createBinding(hotkeys, '<c-k><c-a>', callback)
addBinding(binding)

const bindings = createBindings(hotkeys, ['<d-left>', '<home>'], callback)
addBindings(bindings)

// Create and add bindings in one go:

const binding = addShortcut(hotkeys, '<c-k><c-a>', callback)
const bindings = addShortcuts(hotkeys, ['<d-left>', '<home>'], callback)
```

## Reference

### addBinding

Registers a binding, returns a function to remove it:

```ts
import { addBinding, createHotkeys, getAllBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const removeBinding = addBinding(hotkeys, binding)

// [binding]
getAllBindings(hotkeys)

removeBinding()
// []
getAllBindings(hotkeys)
```

### addBindings

Registers multiple bindings at once, returns a function to remove them:

```ts
import { addBindings, createHotkeys, getAllBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

const removeBindings = addBindings(hotkeys, [binding])

// [binding]
getAllBindings(hotkeys)

removeBindings()
// []
getAllBindings(hotkeys)
```

### removeBinding

Removes a binding:

```ts
import { addBinding, createHotkeys, getAllBindings, removeBinding } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

addBinding(hotkeys, binding)
// [binding]
getAllBindings(hotkeys)

removeBinding(hotkeys, binding)
// []
getAllBindings(hotkeys)
```

### removeBindings

Removes several bindings at once:

```ts
import { addBinding, createHotkeys, getAllBindings, removeBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

addBinding(hotkeys, binding)
// [binding]
getAllBindings(hotkeys)

removeBindings(hotkeys, [binding])
// []
getAllBindings(hotkeys)
```

### setBindingCallback

Overwrites the `callback` of an existing binding:

```ts
import { setBindingCallback } from '@monstermann/hotkeys'

const binding = {
    hotkeys: [],
    callback: () => console.log('Foo'),
    context: {},
}

// The above binding will now print 'Bar' when executed:
setBindingCallback(binding, () => console.log('Bar'))
```

### setBindingCallbacks

Overwrites the `callback` of multiple existing bindings at once:

```ts
import { setBindingCallbacks } from '@monstermann/hotkeys'

const bindingA = {
    hotkeys: [],
    callback: () => console.log('Foo'),
    context: {},
}

const bindingB = {
    hotkeys: [],
    callback: () => console.log('Foo'),
    context: {},
}

// Both bindings will now print 'Bar' when executed:
setBindingCallbacks([bindingA, bindingB], () => console.log('Bar'))
```

---

[← Hotkey](./hotkey.md) • [Executing Shortcuts →](./executing-shortcuts.md)
