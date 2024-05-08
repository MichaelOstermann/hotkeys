import { serializeHotkey } from '../serializeHotkey.js'
import type { Binding, HotkeysConfig, HotkeysMap } from '../types.js'

export function unsetInShortcuts<T extends HotkeysConfig>(
    shortcuts: HotkeysMap<T>,
    binding: Binding<T>,
    offset: number,
): void {
    const hotkey = binding.hotkeys[offset]
    if (!hotkey) return

    const shortcut = serializeHotkey(hotkey)

    const target = shortcuts.get(shortcut)
    if (!target) return

    if (offset === binding.hotkeys.length - 1)
        target.bindings.delete(binding)
    else
        unsetInShortcuts(target.shortcuts, binding, offset + 1)

    if (target.bindings.size === 0 && target.shortcuts.size === 0)
        shortcuts.delete(shortcut)
}
