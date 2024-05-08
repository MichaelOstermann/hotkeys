import type { Binding, BindingCallback, HotkeysConfig } from './types.js'

export function setBindingCallbacks<T extends HotkeysConfig>(
    bindings: Binding<T>[],
    callback: BindingCallback<T>,
): void {
    bindings.forEach(binding => binding.callback = callback)
}
