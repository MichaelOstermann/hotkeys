import { resolve } from "./resolve"
import { special } from "./special"

/**
 * # isSpecial
 *
 * ```ts
 * function Key.isSpecial(key: string): boolean
 * ```
 *
 * Whether the key is one that is not a character, such as `Enter`, `ArrowDown` or `F1`.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isSpecial("esc"); // true
 * Key.isSpecial("ArrowDown"); // true
 * Key.isSpecial("a"); // false
 * ```
 */
export function isSpecial(key: string): boolean {
    return Object.hasOwn(special, resolve(key))
}
