import type { HotkeysBuilder } from '../createHotkeys.js'

type Enabled =
    | boolean
    | (() => boolean)

type Options = {
    default: Enabled
}

export function createEnabledPlugin(options?: Options) {
    return function (hotkeys: HotkeysBuilder) {
        return hotkeys
            .bindingContext<{ enabled: Enabled }>()
            .defaultBindingContext({ enabled: options?.default ?? true })
            .resolveBindings((bindings) => {
                return bindings.filter((binding) => {
                    const enabled = binding.context.enabled
                    return typeof enabled === 'boolean'
                        ? enabled
                        : enabled()
                })
            })
    }
}
