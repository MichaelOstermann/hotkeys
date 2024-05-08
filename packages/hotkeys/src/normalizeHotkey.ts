import { isModifierKey, isPlainKey, modifierKeys } from './keys.js'
import type { Hotkey } from './types.js'

export function normalizeHotkey(hotkey: Hotkey): Hotkey {
    hotkey = normalizeModifierKey(hotkey)
    hotkey = normalizeShift(hotkey)
    hotkey = normalizeAlt(hotkey)
    hotkey = cleanEmptyProps(hotkey)
    return hotkey
}

function normalizeModifierKey(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!isModifierKey(hotkey.key)) return hotkey

    const key = hotkey.key
    hotkey.key = undefined

    if (key === modifierKeys.meta) hotkey.meta = true
    else if (key === modifierKeys.control) hotkey.ctrl = true
    else if (key === modifierKeys.alt) hotkey.alt = true
    else if (key === modifierKeys.shift) hotkey.shift = true

    return hotkey
}

function normalizeShift(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!hotkey.shift) return hotkey
    if (!isPlainKey(hotkey.key)) return hotkey

    hotkey.key = hotkey.key.toUpperCase()
    hotkey.shift = false

    return hotkey
}

function normalizeAlt(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!isPlainKey(hotkey.key)) return hotkey

    hotkey.alt = false

    return hotkey
}

function cleanEmptyProps(hotkey: Hotkey): Hotkey {
    return Object.fromEntries(Object
        .entries(hotkey)
        .filter(([_, v]) => !!v))
}
