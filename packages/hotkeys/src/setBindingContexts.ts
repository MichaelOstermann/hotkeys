import { createBindingContext } from './createBindingContext.js'
import type { Binding, BindingContextParameter, Hotkeys, HotkeysConfig } from './types.js'

export function setBindingContexts<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    bindings: Binding<T>[],
    ...rest: BindingContextParameter<T>
): void {
    const context = createBindingContext(hotkeys, ...rest)
    bindings.forEach(binding => binding.context = context)
}
