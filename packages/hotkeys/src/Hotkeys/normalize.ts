import type { Hotkey } from "../types"
import { Key } from "../Key"

export function normalize<T extends Hotkey>(hotkeys: T[]): Hotkey[] {
    return hotkeys.map((hotkey) => {
        let h = resolveAliases(hotkey)
        h = normalizeModifier(h)
        h = normalizeShift(h)
        h = normalizeAlt(h)
        h = cleanProps(h)
        return h
    })
}

function resolveAliases(hotkey: Hotkey): Hotkey {
    return { ...hotkey, key: Key.resolve(hotkey.key || "") }
}

function normalizeModifier(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!Key.isModifier(hotkey.key)) return hotkey

    const key = hotkey.key
    hotkey = { ...hotkey, key: undefined }

    if (Key.isMeta(key)) hotkey.meta = true
    else if (Key.isCtrl(key)) hotkey.ctrl = true
    else if (Key.isAlt(key)) hotkey.alt = true
    else if (Key.isShift(key)) hotkey.shift = true

    return hotkey
}

function normalizeShift(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!hotkey.shift) return hotkey
    if (!Key.isPlain(hotkey.key)) return hotkey
    return { ...hotkey, key: hotkey.key.toUpperCase(), shift: false }
}

function normalizeAlt(hotkey: Hotkey): Hotkey {
    if (!hotkey.key) return hotkey
    if (!Key.isPlain(hotkey.key)) return hotkey
    return { ...hotkey, alt: false }
}

const keys = ["alt", "ctrl", "key", "meta", "shift"]
function cleanProps(hotkey: Hotkey): Hotkey {
    return Object.fromEntries(Object
        .entries(hotkey)
        .filter(([k, v]) => !!v && keys.includes(k)))
}
