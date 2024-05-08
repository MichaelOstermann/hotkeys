import { setInShortcuts } from './helpers/setInShortcuts.js'
import { removeBinding } from './removeBinding.js'
import type { Binding, Hotkeys, HotkeysConfig } from './types.js'

export function addBinding<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    binding: Binding<T>,
): () => void {
    setInShortcuts(hotkeys.shortcuts, binding, 0)
    return () => removeBinding(hotkeys, binding)
}
