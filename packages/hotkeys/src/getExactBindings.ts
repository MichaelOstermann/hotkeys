import { getInShortcuts } from './helpers/getInShortcuts.js'
import type { Binding, Hotkey, Hotkeys, HotkeysConfig } from './types.js'

export function getExactBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    sequence: Hotkey[],
): Binding<T>[] {
    const shortcut = getInShortcuts(hotkeys.shortcuts, sequence, 0)
    return Array.from(shortcut?.bindings ?? [])
}
