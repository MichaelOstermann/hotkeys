import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

/**
 * # isCtrl
 *
 * ```ts
 * function Key.isCtrl(key: string): boolean
 * ```
 *
 * Whether the key is the control key, by any of its names.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isCtrl("ctrl"); // true
 * Key.isCtrl("Control"); // true
 * Key.isCtrl("a"); // false
 * ```
 */
export function isCtrl(key: string): boolean {
    return resolve(key) === modifiers.control
}
