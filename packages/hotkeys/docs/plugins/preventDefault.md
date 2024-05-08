[← Plugin: enabled](./enabled.md) • [Plugin: os →](./os.md)

---

# Plugin: preventDefault

Plugin that introduces the `{ preventDefault: boolean }` binding context and `{ event: KeyboardEvent | InputEvent | undefined }` event context, so you don't have to manually run `event.preventDefault()` in your binding callbacks:

```ts
import { createEventContext, createHotkeys, execBindings, getAllBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'
import { createPreventDefaultPlugin } from '@monstermann/hotkeys/plugins/preventDefault'

const hotkeys = createHotkeys(config => config
    .use(createPreventDefaultPlugin()))

addShortcut(hotkeys, 'ctrl+a', callback, { preventDefault: true })

document.addEventListener('keydown', (event) => {
    const bindings = getAllBindings(hotkeys)
    const context = createEventContext({ event })
    // Event will be default prevented!
    execBindings(hotkeys, bindings, context)
})
```

## Options

```ts
// Do not prevent default, unless one binding uses { preventDefault: true }
createPreventDefaultPlugin()
createPreventDefaultPlugin({ default: false })

// Always prevent default, unless one binding uses { preventDefault: false }
createPreventDefaultPlugin({ default: true })
```

---

[← Plugin: enabled](./enabled.md) • [Plugin: os →](./os.md)
