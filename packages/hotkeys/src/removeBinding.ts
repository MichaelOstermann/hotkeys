import { unsetInShortcuts } from './helpers/unsetInShortcuts.js'
import type { Binding, Hotkeys, HotkeysConfig } from './types.js'

export function removeBinding<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    binding: Binding<T>,
): void {
    unsetInShortcuts(hotkeys.shortcuts, binding, 0)
}
