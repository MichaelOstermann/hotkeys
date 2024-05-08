import { getInShortcuts } from './helpers/getInShortcuts.js'
import type { Hotkey, Hotkeys, HotkeysConfig } from './types.js'

export function hasBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    sequence: Hotkey[],
): boolean {
    return getInShortcuts(hotkeys.shortcuts, sequence, 0) !== undefined
}
