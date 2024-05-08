[← Event Context](./event-context.md) • [Binding Hooks →](./binding-hooks.md)

---

# Binding Resolvers

Binding resolvers are a convenient way for you to compose filters that kick out unwanted bindings, for example temporarily disabled bindings, before execution.

Using these is entirely optional and only provided for convenience - you can always roll your own `bindings.filter(…)` for example!

## Defining Resolvers

Here is an example for a resolver that removes bindings that are marked as disabled:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true })
    .resolveBindings(bindings => bindings.filter(binding => binding.context.enabled)))
```

## Using Resolvers

Binding resolvers do not automagically execute in functions such as `getAllBindings`, `getExactBindings` or `getPartialBindings` - you will have to explicitly use `resolveBindings`:

```ts
import { createHotkeys, getAllBindings, resolveBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true })
    .resolveBindings(bindings => bindings.filter(binding => binding.context.enabled)))

const bindingA = addShortcut(hotkeys, 'ctrl+a', callback)
const bindingB = addShortcut(hotkeys, 'ctrl+a', callback, { enabled: false })

// [bindingA, bindingB]
const candidates = getAllBindings(hotkeys)

// [bindingA]
const bindings = resolveBindings(hotkeys, candidates)
```

## Accessing Contexts

Apart from resolvers having access to bindings and thus [binding contexts](./binding-context.md), they also have access to [event contexts](./event-context.md):

```ts
import { createHotkeys, getAllBindings, resolveBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .resolveBindings((bindings, eventContext) => eventContext.foo ? bindings : []))

const candidates = getAllBindings(hotkeys)

resolveBindings(hotkeys, candidates, { foo: true })
```

---

[← Event Context](./event-context.md) • [Binding Hooks →](./binding-hooks.md)
