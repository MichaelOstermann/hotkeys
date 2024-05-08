import type { Hotkey } from './types.js'

export function serializeHotkey(hotkey: Hotkey): string {
    let result = ''
    if (hotkey.meta) result = add(result, 'meta')
    if (hotkey.ctrl) result = add(result, 'ctrl')
    if (hotkey.alt) result = add(result, 'alt')
    if (hotkey.shift) result = add(result, 'shift')
    if (hotkey.key) result = add(result, hotkey.key)
    return result
}

function add(a: string, b: string): string {
    return a ? `${a}+${b}` : b
}
