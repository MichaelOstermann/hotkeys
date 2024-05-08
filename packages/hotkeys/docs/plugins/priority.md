[← Plugin: os](./os.md)

---

# Plugin: priority

Plugin that introduces the `{ priority: number }` binding context, useful to resolve conflicting shortcuts:

```ts
import { createHotkeys, getAllBindings, resolveBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'
import { createPriorityPlugin } from '@monstermann/hotkeys/plugins/priority'

const hotkeys = createHotkeys(config => config
    .use(createPriorityPlugin()))

const bindingA = addShortcut(hotkeys, 'esc', callback)
const bindingB = addShortcut(hotkeys, 'esc', callback, { priority: 10 })

const candidates = getAllBindings(hotkeys)

// [bindingB]
const bindings = resolveBindings(hotkeys, candidates)
```

## Options

```ts
// Default priority: 0
createPriorityPlugin()

// Custom default priority:
createPriorityPlugin({ default: 100 })
```

---

[← Plugin: os](./os.md)
