import type { HotkeysBuilder } from '../createHotkeys.js'
import type { HotkeysConfig } from '../types.js'

type Options = {
    default: number
}

export function createPriorityPlugin(options?: Options) {
    return function<T extends HotkeysConfig>(hotkeys: HotkeysBuilder<T>) {
        return hotkeys
            .bindingContext<{ priority: number }>()
            .defaultBindingContext({ priority: options?.default ?? 0 })
            .resolveBindings((bindings) => {
                const maxPriority = bindings.reduce((priority, binding) => {
                    return Math.max(priority, binding.context.priority)
                }, 0)

                return bindings.filter((binding) => {
                    return binding.context.priority === maxPriority
                })
            })
    }
}
