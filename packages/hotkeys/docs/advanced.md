[← Sequences](./sequences.md) • [Binding Context →](./binding-context.md)

---

# Advanced

Having looked at how to register shortcuts and execute them, let's look at some more "advanced" concepts.

In shortcut libraries you often want additional functionality such as:

- Temporarily disabling bindings
- Resolving conflicting shortcuts when using React
- Use `event.preventDefault()` in browser environments
- Attaching shortcuts to "scopes" such as `'globals' | 'modals' | …` with the ability to disable/enable them

This library comes with none of these features baked-in, however it provides you with 4 very simple options that should help you set these things up:

- [Binding Context](./binding-context.md)
- [Event Context](./event-context.md)
- [Binding Resolvers](./binding-resolvers.md)
- [Binding Hooks](./binding-hooks.md)

All of these options are accessible via a function provided to `createHotkeys`, for example:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true }))
```

These are all optional for you to use!

---

[← Sequences](./sequences.md) • [Binding Context →](./binding-context.md)
