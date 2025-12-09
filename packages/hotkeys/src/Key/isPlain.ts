import { isModifier } from "./isModifier"
import { isSpecial } from "./isSpecial"

export function isPlain(key: string): boolean {
    return !isModifier(key)
        && !isSpecial(key)
}
