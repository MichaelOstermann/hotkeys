import type { Hotkey } from "../types"
import { serialize } from "./serialize"
import { vsc } from "./vsc"

export function isExactMatch<T extends Hotkey>(a: T[] | string, b: T[] | string): boolean {
    return serialize(typeof a === "string" ? vsc(a) : a)
        === serialize(typeof b === "string" ? vsc(b) : b)
}
