import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

/**
 * # isAlt
 *
 * ```ts
 * function Key.isAlt(key: string): boolean
 * ```
 *
 * Whether the key is the alt key, by any of its names.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isAlt("alt"); // true
 * Key.isAlt("option"); // true
 * Key.isAlt("a"); // false
 * ```
 */
export function isAlt(key: string): boolean {
    return resolve(key) === modifiers.alt
}
