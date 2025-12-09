import type { Hotkey } from "../types"
import { Key } from "../Key"
import { normalize } from "./normalize"

const separatorRegExp = /<[^<>\s]+>|[\s\S]|^$/g
const keyRegExp = /^<((?:[a-z]-)*)([a-z\d]+|[^<>\s])>$/i

export function vim(shortcut: string): Hotkey[] {
    return normalize((shortcut.match(separatorRegExp) ?? []).map((shortcut) => {
        const match = shortcut.match(keyRegExp)
        const hotkey = getModifiers(match).reduce((acc, key) => {
            if (key.toLowerCase() === "d" || Key.isMeta(key)) acc.meta = true
            else if (key.toLowerCase() === "c" || Key.isCtrl(key)) acc.ctrl = true
            else if (["a", "m"].includes(key.toLowerCase()) || Key.isAlt(key)) acc.alt = true
            else if (key.toLowerCase() === "s" || Key.isShift(key)) acc.shift = true
            return acc
        }, {} as Hotkey)

        hotkey.key = Key.resolve(getKey(match, shortcut))
        return hotkey
    }))
}

function getKey(match: RegExpMatchArray | null, shortcut: string): string {
    return match?.[2] ?? shortcut
}

function getModifiers(match: RegExpMatchArray | null): string[] {
    return match?.[1]?.split("-") ?? []
}
