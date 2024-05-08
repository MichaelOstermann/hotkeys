import { setInShortcuts } from './helpers/setInShortcuts.js'
import { removeBindings } from './removeBindings.js'
import type { Binding, Hotkeys, HotkeysConfig } from './types.js'

export function addBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    bindings: Binding<T>[],
): () => void {
    for (const binding of bindings)
        setInShortcuts(hotkeys.shortcuts, binding, 0)
    return () => removeBindings(hotkeys, bindings)
}
