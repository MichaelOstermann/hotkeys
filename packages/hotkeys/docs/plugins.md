[← Binding Hooks](./binding-hooks.md) • [Available Plugins →](./available-plugins.md)

---

# Plugins

Plugins are a means to tuck away things such as binding contexts, resolvers, etc., into isolated functions.

## Creating Plugins

Here's a simple plugin that allows you to temporarily disable bindings:

```ts
function createEnabledPlugin(defaultValue: boolean) {
    return function (config: HotkeysBuilder) {
        return config
            .bindingContext<{ enabled: boolean }>()
            .defaultBindingContext({ enabled: defaultValue })
            .resolveBindings((bindings) => {
                return bindings.filter(binding => binding.context.enabled === true)
            })
    }
}
```

## Using Plugins

Here is how you can use the above plugin:

```ts
const enabledPlugin = createEnabledPlugin(true)
const hotkeys = createHotkeys(config => config.use(enabledPlugin))
```

---

[← Binding Hooks](./binding-hooks.md) • [Available Plugins →](./available-plugins.md)
