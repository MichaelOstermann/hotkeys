import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

/**
 * # isMeta
 *
 * ```ts
 * function Key.isMeta(key: string): boolean
 * ```
 *
 * Whether the key is the meta key (Command on macOS, the Windows key elsewhere), by any of its names.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isMeta("meta"); // true
 * Key.isMeta("cmd"); // true
 * Key.isMeta("a"); // false
 * ```
 */
export function isMeta(key: string): boolean {
    return resolve(key) === modifiers.meta
}
