import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

/**
 * # isModifier
 *
 * ```ts
 * function Key.isModifier(key: string): boolean
 * ```
 *
 * Whether the key is one of the modifier keys: meta, control, alt or shift.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.isModifier("cmd"); // true
 * Key.isModifier("Shift"); // true
 * Key.isModifier("a"); // false
 * ```
 */
export function isModifier(key: string): boolean {
    return Object.hasOwn(modifiers, resolve(key))
}
