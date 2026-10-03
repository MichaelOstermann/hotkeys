import type { Hotkey } from "../types"
import { Key } from "../Key"

/**
 * # normalize
 *
 * ```ts
 * function Hotkeys.normalize(hotkeys: Hotkey[]): Hotkey[]
 * ```
 *
 * Brings hotkeys into the form that everything else works with:
 *
 * 1. Aliases are resolved (`esc` → `Escape`)
 * 2. A modifier as the key becomes the modifier itself (`{ key: "Control" }` → `{ ctrl: true }`)
 * 3. An uppercase letter is that letter with shift (`{ key: "A" }` → `{ shift: true, key: "a" }`)
 * 4. Properties that are not set are removed
 *
 * Throws for keys that are neither a known name nor a single character.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.normalize([{ key: "esc" }]);
 * // [{ key: "Escape" }]
 *
 * Hotkeys.normalize([{ key: "Control" }]);
 * // [{ ctrl: true }]
 *
 * Hotkeys.normalize([{ key: "A" }]);
 * // [{ shift: true, key: "a" }]
 *
 * Hotkeys.normalize([{ key: "foo" }]);
 * // Throws: Unknown key "foo"
 * ```
 */
export function normalize<T extends Hotkey>(hotkeys: T[]): Hotkey[] {
    return hotkeys.map((hotkey) => {
        const result: Hotkey = {}
        let key = hotkey.key ? Key.resolve(hotkey.key) : undefined
        let shift = !!hotkey.shift

        if (hotkey.alt || (key && Key.isAlt(key))) result.alt = true
        if (hotkey.ctrl || (key && Key.isCtrl(key))) result.ctrl = true
        if (hotkey.meta || (key && Key.isMeta(key))) result.meta = true
        if (key && Key.isShift(key)) shift = true
        if (key && Key.isModifier(key)) key = undefined

        if (key && !Key.isSpecial(key)) {
            if (Array.from(key).length !== 1) throw new Error(`Unknown key "${key}"`)
            const lower = key.toLowerCase()
            if (lower !== key) shift = true
            key = lower
        }

        if (shift) result.shift = true
        if (key) result.key = key
        return result
    })
}
