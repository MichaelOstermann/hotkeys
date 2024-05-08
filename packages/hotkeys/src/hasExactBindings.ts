import { getInShortcuts } from './helpers/getInShortcuts.js'
import type { Hotkey, Hotkeys, HotkeysConfig } from './types.js'

export function hasExactBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    sequence: Hotkey[],
): boolean {
    const shortcut = getInShortcuts(hotkeys.shortcuts, sequence, 0)
    if (!shortcut) return false
    return shortcut.bindings.size > 0
}
