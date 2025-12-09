import type { Hotkey } from "../types"
import { Key } from "../Key"
import { normalize } from "./normalize"

const separator = /\s+/g
const key = /(?<!\+)\+/g

export function vsc(string: string): Hotkey[] {
    return normalize(string
        .trim()
        .split(separator)
        .map(shortcut => shortcut
            .split(key)
            .map(Key.resolve)
            .reduce<Hotkey>((acc, key) => {
                if (Key.isMeta(key)) acc.meta = true
                else if (Key.isCtrl(key)) acc.ctrl = true
                else if (Key.isAlt(key)) acc.alt = true
                else if (Key.isShift(key)) acc.shift = true
                else acc.key = key
                return acc
            }, {})))
}
