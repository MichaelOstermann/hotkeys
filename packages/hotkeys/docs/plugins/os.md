[← Plugin: preventDefault](./preventDefault.md) • [Plugin: priority →](./priority.md)

---

# Plugin: os

Plugin that introduces the `{ os: string[] }` binding context, helpful to disable/enable bindings in different environments:

```ts
import { createHotkeys, getAllBindings, resolveBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'
import { createOSPlugin } from '@monstermann/plugins/os'

const hotkeys = createHotkeys(config => config
    .use(createOSPlugin({
        getOS() {
            if (a) return 'Mac'
            if (b) return 'Lin'
            return 'Win'
        },
    })))

const bindingA = addShortcut(hotkeys, 'ctrl+a', callback)
const bindingB = addShortcut(hotkeys, 'ctrl+a', callback, { os: ['Mac'] })

const candidates = getAllBindings(hotkeys)

// [bindingA] on any platform
// [bindingA, bindingB] on Mac
const bindings = resolveBindings(hotkeys, candidates)
```

---

[← Plugin: preventDefault](./preventDefault.md) • [Plugin: priority →](./priority.md)
