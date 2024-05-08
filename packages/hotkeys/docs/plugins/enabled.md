[← Available Plugins](../available-plugins.md) • [Plugin: preventDefault →](./preventDefault.md)

---

# Plugin: enabled

Plugin that introduces the `{ enabled: boolean | (() => boolean) }` binding context, particularly helpful when hotkeys are used in combination with React.

```ts
import { createHotkeys, getAllBindings, resolveBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'
import { createEnabledPlugin } from '@monstermann/hotkeys/plugins/enabled'

const hotkeys = createHotkeys(config => config
    .use(createEnabledPlugin()))

const bindingA = addShortcut(hotkeys, 'ctrl+a', callback)
const bindingB = addShortcut(hotkeys, 'ctrl+a', callback, { enabled: false })

const candidates = getAllBindings(hotkeys)

// [bindingA]
const bindings = resolveBindings(hotkeys, candidates)
```

## Options

```ts
// Enable bindings by default:
createEnabledPlugin()
createEnabledPlugin({ default: true })

// Disable bindings by default:
createEnabledPlugin({ default: false })
```

---

[← Available Plugins](../available-plugins.md) • [Plugin: preventDefault →](./preventDefault.md)
