import { removeBinding } from './removeBinding.js'
import type { Binding, Hotkeys, HotkeysConfig } from './types.js'

export function removeBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    bindings: Binding<T>[],
): void {
    for (const binding of bindings)
        removeBinding(hotkeys, binding)
}
