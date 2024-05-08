[← Advanced](./advanced.md) • [Event Context →](./event-context.md)

---

# Binding Context

Binding contexts are a means for shortcuts to provide additional information upstream to whatever is responsible for executing shortcuts in your application.

By default, registering a shortcut might look like this:

```ts
import { createHotkeys } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys()

addShortcut(hotkeys, 'ctrl+a', callback)
```

However you might want to be able to do this:

```ts
addShortcut(_, _, _, {
    enabled: true,
})
```

## Defining Contexts

Here is how you can define the required types for your shortcuts:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .bindingContext<{ preventDefault: boolean }>())
```

Now all shortcuts are required to pass in the additional parameter `{ enabled: boolean, preventDefault: boolean }`:

```ts
addShortcut(_, _, _, {
    enabled: true,
    preventDefault: false,
})
```

## Accessing Contexts

The context is simply stored inside bindings via `binding.context`, so here is an example:

```ts
import { createHotkeys, getAllBindings } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>())

addShortcut(hotkeys, 'ctrl+a', callback, { enabled: true })

const bindings = getAllBindings(hotkeys)
    .filter(binding => binding.context.enabled === true)
```

## Optional Contexts

If you configure a binding context that contains one or more required properties, then that will require **all** your bindings to provide them.

While this strictness is valuable, it might be inconvenient. Marking all properties as optional will update the signatures accordingly:

```ts
import { createHotkeys } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys(config => config
    // Marking everything as optional:
    .bindingContext<{ enabled?: boolean }>())

// Passing the context is now optional:
addShortcut(hotkeys, 'ctrl+a', callback)
```

## Providing Defaults

Marking properties as optional as shown above might simplify the creation of shortcuts, but in turn introduce a bunch of `?` or `??` operators elsewhere.

Instead, you can define default values:

```ts
import { createHotkeys } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true }))

// Passing the context is still optional, but you don't have to deal with
// boolean | undefined elsewhere:
addShortcut(hotkeys, 'ctrl+a', callback)
```

## Creating Contexts

If you are using either `@monstermann/hotkeys/vscode` or `@monstermann/hotkeys/vim`, then the binding contexts will already be covered for you.

However if you need to manually construct them:

```ts
import { createBindingContext, createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true })
    .bindingContext<{ preventDefault: boolean }>()
    .defaultBindingContext({ preventDefault: false }))

// { enabled: true, preventDefault: true }
const context = createBindingContext(hotkeys, {
    preventDefault: true,
})
```

## Reference

### config.bindingContext

Sets up the type definitions for binding contexts. This method can be chained, the types get merged as a result:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .bindingContext<{ preventDefault: boolean }>())
```

### config.defaultBindingContext

Provides default values for the currently defined binding context. This method can be chained, the values get merged as a result:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{
        enabled: boolean
        preventDefault: boolean
    }>()
    .defaultBindingContext({
        enabled: true,
        preventDefault: false,
    }))
```

### InferBindingContext

Infers the binding context of a hotkeys instance:

```ts
import type { InferBindingContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .bindingContext<{ preventDefault: boolean }>()
    .defaultBindingContext({ enabled: true }))

// { enabled: boolean, preventDefault: boolean }
type Context = InferBindingContext<typeof hotkeys>
```

### InferDefaultBindingContext

Infers the default binding context of a hotkeys instance:

```ts
import type { InferDefaultBindingContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .bindingContext<{ preventDefault: boolean }>()
    .defaultBindingContext({ enabled: true }))

// { enabled: boolean }
type Context = InferDefaultBindingContext<typeof hotkeys>
```

### InferResolvedBindingContext

Infers the binding context of a hotkeys instance, with properties marked as optional based on the default contexts:

```ts
import type { InferResolvedBindingContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .bindingContext<{ preventDefault: boolean }>()
    .defaultBindingContext({ enabled: true }))

// { enabled: boolean, preventDefault?: enabled }
type Context = InferResolvedBindingContext<typeof hotkeys>
```
### createBindingContext

Constructs a binding context, while considering defaults:

```ts
import { createBindingContext, createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .bindingContext<{ enabled: boolean }>()
    .defaultBindingContext({ enabled: true })
    .bindingContext<{ preventDefault: boolean }>()
    .defaultBindingContext({ preventDefault: false }))

// { enabled: true, preventDefault: true }
const context = createBindingContext(hotkeys, {
    preventDefault: true,
})
```
### setBindingContext

Allows you to update the binding context of an existing binding, uses `createBindingContext` under the hood:

```ts
import { setBindingContext } from '@monstermann/hotkeys'
import { createBinding } from '@monstermann/hotkeys/vscode'

const binding = createBinding(hotkeys, 'ctrl+a', callback, context)

setBindingContext(binding, newContext)
```

### setBindingContexts

Allows you to update the binding contexts of several existing bindings at once, uses `createBindingContext` under the hood.

This is more efficient than using `setBindingContext` in a loop, as only one context will be constructed and assigned:

```ts
import { setBindingContexts } from '@monstermann/hotkeys'
import { createBinding } from '@monstermann/hotkeys/vscode'

const bindingA = createBinding(hotkeys, 'ctrl+a', callback, context)
const bindingB = createBinding(hotkeys, 'ctrl+a', callback, context)

setBindingContexts([bindingA, bindingB], newContext)
```

---

[← Advanced](./advanced.md) • [Event Context →](./event-context.md)
