import { isModifier } from "./isModifier"
import { isSpecial } from "./isSpecial"

/**
 * # isPlain
 *
 * ```ts
 * function Key.isPlain(key: string): boolean
 * ```
 *
 * Whether the key is neither a modifier nor a special key, which leaves letters, digits and symbols.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isPlain("a"); // true
 * Key.isPlain("?"); // true
 * Key.isPlain("Enter"); // false
 * ```
 */
export function isPlain(key: string): boolean {
    return !isModifier(key)
        && !isSpecial(key)
}
