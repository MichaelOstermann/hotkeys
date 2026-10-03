import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

/**
 * # isShift
 *
 * ```ts
 * function Key.isShift(key: string): boolean
 * ```
 *
 * Whether the key is the shift key.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isShift("shift"); // true
 * Key.isShift("a"); // false
 * ```
 */
export function isShift(key: string): boolean {
    return resolve(key) === modifiers.shift
}
