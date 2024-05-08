import { bindings } from './bindings.js'
import { getInShortcuts } from './helpers/getInShortcuts.js'
import type { Binding, Hotkey, Hotkeys, HotkeysConfig } from './types.js'

export function getPartialBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    sequence: Hotkey[],
): Binding<T>[] {
    const shortcut = getInShortcuts(hotkeys.shortcuts, sequence, 0)
    if (!shortcut) return []
    return Array.from(bindings(shortcut.shortcuts))
}
