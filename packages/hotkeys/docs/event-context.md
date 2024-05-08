[← Binding Context](./binding-context.md) • [Binding Resolvers →](./binding-resolvers.md)

---

# Event Context

If binding contexts are a way for shortcuts to communicate upstream, then event contexts do the opposite - they allow you to send information downstream, for example to the callbacks of your shortcuts.

## Defining Contexts

Here is how you can define the required types for your event contexts:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .eventContext<{ bar: number }>())
```

Now in order to be able to do things such as executing shortcuts, you will have to provide `{ foo: boolean, bar: number }`!

## Accessing Contexts

You can access event contexts for example in binding callbacks:

```ts
import { createHotkeys } from '@monstermann/hotkeys'
import { addShortcut } from '@monstermann/hotkeys/vscode'

const hotkeys = createHotkeys(config => config
    .eventContext<{ event: KeyboardEvent }>())

addShortcut(hotkeys, 'esc', (eventContext) => {
    eventContext.event.preventDefault()
})
```

As we'll see later on, they are also made available in [binding resolvers](./binding-resolvers.md#accessing-contexts) and [binding hooks](./binding-hooks.md#accessing-contexts).

## Providing Static Defaults

Just like [binding contexts](./binding-context.md#providing-defaults), you have the option to provide default values:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .defaultEventContext({ foo: true }))
```

## Providing Dynamic Defaults

Additionally you can use functions to dynamically define defaults:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .defaultEventContext(() => ({ foo: someCondition === true })))
```

## Creating Contexts

In order to construct event contexts that cover default values as shown above, you can use `createEventContext`:

```ts
import { createEventContext, createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .defaultEventContext({ foo: true }))

// { foo: true }
createEventContext(hotkeys)
// { foo: false }
createEventContext(hotkeys, { foo: false })
```

If you are not using default contexts, or are using an alternative implementation, then `createEventContext` is obsolete!

## Reference

### config.eventContext

Sets up the type definitions for event contexts. This method can be chained, the types get merged as a result:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .eventContext<{ bar: number }>())
```

### config.defaultEventContext

Provides default values for the currently defined event context. This method can be chained, the values get merged as a result:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{
        foo: boolean
        bar: boolean
    }>()
    .defaultEventContext({ foo: true })
    .defaultEventContext(() => ({ bar: false })))
```

### InferEventContext

Infers the event context of a hotkeys instance:

```ts
import type { InferEventContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .eventContext<{ bar: boolean }>()
    .defaultEventContext({ foo: true }))

// { foo: boolean, bar: boolean }
type Context = InferEventContext<typeof hotkeys>
```

### InferDefaultEventContext

Infers the default event context of a hotkeys instance:

```ts
import type { InferDefaultEventContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .eventContext<{ bar: boolean }>()
    .defaultEventContext({ foo: true }))

// { foo: boolean }
type Context = InferDefaultEventContext<typeof hotkeys>
```

### InferResolvedEventContext

Infers the event context of a hotkeys instance, with properties marked as optional based on the default contexts:

```ts
import type { InferResolvedEventContext } from '@monstermann/hotkeys'
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .eventContext<{ bar: boolean }>()
    .defaultEventContext({ foo: true }))

// { foo?: boolean, bar: boolean }
type Context = InferResolvedEventContext<typeof hotkeys>
```
### createEventContext

Constructs an event context, while considering defaults:

```ts
import { createEventContext, createHotkeys } from '@monstermann/hotkeys'

let example = true

const hotkeys = createHotkeys(config => config
    .eventContext<{ foo: boolean }>()
    .defaultEventContext({ foo: true })

    .eventContext<{ bar: boolean }>()
    .defaultEventContext(() => ({ bar: example })))

// { foo: true, bar: true }
createEventContext(hotkeys)
// { foo: false, bar: true }
createEventContext(hotkeys, { foo: false })
// { foo: true, bar: false }
createEventContext(hotkeys, { bar: false })
// { foo: false, bar: false }
createEventContext(hotkeys, { foo: false, bar: false })

example = false

// { foo: true, bar: false }
createEventContext(hotkeys)
// { foo: false, bar: false }
createEventContext(hotkeys, { foo: false })
// { foo: true, bar: true }
createEventContext(hotkeys, { bar: true })
// { foo: false, bar: true }
createEventContext(hotkeys, { foo: false, bar: true })
```

---

[← Binding Context](./binding-context.md) • [Binding Resolvers →](./binding-resolvers.md)
