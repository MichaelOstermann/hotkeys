import type { Hotkey } from "../types"
import { serialize } from "./serialize"
import { vsc } from "./vsc"

export function isPartialMatch<T extends Hotkey>(a: T[] | string, b: T[] | string): boolean {
    const left = typeof a === "string" ? vsc(a) : a
    const right = typeof b === "string" ? vsc(b) : b
    if (right.length >= left.length) return false
    return serialize(left.slice(0, b.length)) === serialize(right)
}
