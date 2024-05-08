[← Binding Resolvers](./binding-resolvers.md) • [Plugins →](./plugins.md)

---

# Binding Hooks

While binding resolvers are primarily for filtering out unwanted bindings, sometimes you want to trigger side-effects before and after actually executing them.

Similarly to resolvers, hooks are mostly provided for convenience!

## Defining Hooks

There are two hooks available: `beforeExecBindings` and `afterExecBindings`:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .beforeExecBindings((bindings) => {
        console.log('Executing bindings:', bindings)
    })
    .afterExecBindings((bindings) => {
        console.log('Executed bindings:', bindings)
    }))
```

## Using Hooks

Just like [resolvers](./binding-resolvers.md), these callbacks have to be explicitly called. The `execBindings` function is provided to do just that:

```ts
import { createHotkeys, execBindings, getAllBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .beforeExecBindings((bindings) => {
        console.log('Executing bindings:', bindings)
    })
    .afterExecBindings((bindings) => {
        console.log('Executed bindings:', bindings)
    }))

const bindings = getAllBindings(hotkeys)

// Will print to the console:
execBindings(hotkeys, bindings)
```

## Accessing Contexts

Similarly to [resolvers](./binding-resolvers.md), hooks have access to [event contexts](./event-context.md) as well:

```ts
import { createHotkeys, execBindings, getAllBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ event: KeyboardEvent }>()
    .beforeExecBindings((bindings, eventContext) => {
        eventContext.event.preventDefault()
    }))

document.addEventListener('keydown', (event) => {
    const bindings = getAllBindings(hotkeys)
    const context = { event }
    execBindings(hotkeys, bindings, context)
})
```

---

[← Binding Resolvers](./binding-resolvers.md) • [Plugins →](./plugins.md)
