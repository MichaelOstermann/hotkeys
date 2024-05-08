import type { Binding, BindingCallback, HotkeysConfig } from './types.js'

export function setBindingCallback<T extends HotkeysConfig>(
    binding: Binding<T>,
    callback: BindingCallback<T>,
): void {
    binding.callback = callback
}
