import type { HotkeysBuilder } from '../createHotkeys.js'
import type { HotkeysConfig } from '../types.js'

type Options = {
    default: boolean
}

export function createPreventDefaultPlugin(options?: Options) {
    const preventDefault = options?.default ?? false

    return function<T extends HotkeysConfig>(hotkeys: HotkeysBuilder<T>) {
        return hotkeys
            .eventContext<{ event: KeyboardEvent | InputEvent | undefined }>()
            .bindingContext<{ preventDefault?: boolean }>()
            .beforeExecBindings((bindings, eventContext) => {
                if (!eventContext.event) return
                if (preventDefault === false && bindings.some(binding => binding.context.preventDefault === true))
                    eventContext.event.preventDefault()
                if (preventDefault === true && !bindings.some(binding => binding.context.preventDefault === false))
                    eventContext.event.preventDefault()
            })
    }
}
