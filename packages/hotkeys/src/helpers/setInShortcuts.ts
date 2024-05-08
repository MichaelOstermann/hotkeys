import { serializeHotkey } from '../serializeHotkey.js'
import type { Binding, HotkeysConfig, HotkeysMap } from '../types.js'

export function setInShortcuts<T extends HotkeysConfig>(
    shortcuts: HotkeysMap<T>,
    binding: Binding<T>,
    offset: number,
): void {
    const hotkey = binding.hotkeys[offset]
    if (!hotkey) return

    const shortcut = serializeHotkey(hotkey)

    if (!shortcuts.has(shortcut))
        shortcuts.set(shortcut, { bindings: new Set(), shortcuts: new Map() })

    if (offset === binding.hotkeys.length - 1)
        shortcuts.get(shortcut)!.bindings.add(binding)
    else
        setInShortcuts(shortcuts.get(shortcut)!.shortcuts, binding, offset + 1)
}
