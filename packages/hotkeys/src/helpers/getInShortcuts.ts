import { serializeHotkey } from '../serializeHotkey.js'
import type { Hotkey, HotkeysConfig, HotkeysEntry, HotkeysMap } from '../types.js'

export function getInShortcuts<T extends HotkeysConfig>(
    shortcuts: HotkeysMap<T>,
    sequence: Hotkey[],
    offset: number,
): HotkeysEntry<T> | undefined {
    const hotkey = sequence[offset]
    if (!hotkey) return undefined

    const next = shortcuts.get(serializeHotkey(hotkey))
    if (!next) return undefined

    if (offset === sequence.length - 1) return next
    return getInShortcuts(next.shortcuts, sequence, offset + 1)
}
