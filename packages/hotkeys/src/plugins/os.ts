import type { HotkeysBuilder } from '../createHotkeys.js'
import type { HotkeysConfig } from '../types.js'

export function createOSPlugin<T extends string>(options: { getOS: () => T }) {
    return function<U extends HotkeysConfig>(hotkeys: HotkeysBuilder<U>) {
        return hotkeys
            .bindingContext<{ os: T[] }>()
            .defaultBindingContext({ os: [] })
            .resolveBindings((bindings) => {
                const os = options.getOS()
                return bindings.filter((binding) => {
                    return binding.context.os.length === 0
                        || binding.context.os.includes(os)
                })
            })
    }
}
