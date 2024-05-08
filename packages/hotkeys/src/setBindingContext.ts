import { createBindingContext } from './createBindingContext.js'
import type { Binding, BindingContextParameter, Hotkeys, HotkeysConfig } from './types.js'

export function setBindingContext<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    binding: Binding<T>,
    ...rest: BindingContextParameter<T>
): void {
    const context = createBindingContext(hotkeys, ...rest)
    binding.context = context
}
