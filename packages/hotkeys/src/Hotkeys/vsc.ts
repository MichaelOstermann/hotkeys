import type { Hotkey } from "../types"
import { Key } from "../Key"
import { mod } from "./mod"
import { normalize } from "./normalize"

/**
 * # vsc
 *
 * ```ts
 * function Hotkeys.vsc(shortcut: string): Hotkey[]
 * ```
 *
 * Parses a VSCode-style hotkey string. This is the format that is used wherever a string is accepted instead of hotkeys.
 *
 * - Single keys: `a`, `Enter`, `Escape`
 * - Modified keys: `ctrl+a`, `meta+shift+k`, `alt+ArrowDown`
 * - Sequences: `ctrl+k ctrl+b`, `g g`
 * - The `+` key itself: `+`, `ctrl++`
 *
 * Modifiers are `meta` (`cmd`, `command`), `ctrl` (`control`), `alt` (`opt`, `option`), `shift`,
 * and `mod`, which is `meta` on Apple platforms and `ctrl` everywhere else, see `Hotkeys.mod`.
 *
 * Throws for anything that is neither a known name nor a single character.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.vsc("ctrl+a");
 * // [{ ctrl: true, key: "a" }]
 *
 * Hotkeys.vsc("meta+shift+k");
 * // [{ meta: true, shift: true, key: "k" }]
 *
 * Hotkeys.vsc("ctrl+k ctrl+b");
 * // [{ ctrl: true, key: "k" }, { ctrl: true, key: "b" }]
 *
 * Hotkeys.vsc("foo+k");
 * // Throws: Unknown key "foo"
 * ```
 */
export function vsc(shortcut: string): Hotkey[] {
    return normalize(shortcut
        .trim()
        .split(/\s+/)
        .map((chord) => {
            const hotkey: Hotkey = {}
            for (const token of tokenize(chord)) {
                if (!token) throw new Error(`Invalid hotkey "${shortcut}"`)
                const key = token.toLowerCase() === "mod" ? mod() : Key.resolve(token)
                if (Key.isMeta(key)) hotkey.meta = true
                else if (Key.isCtrl(key)) hotkey.ctrl = true
                else if (Key.isAlt(key)) hotkey.alt = true
                else if (Key.isShift(key)) hotkey.shift = true
                else if (!Key.isSpecial(key) && Array.from(key).length !== 1) throw new Error(`Unknown key "${token}"`)
                else if (hotkey.key) throw new Error(`Invalid hotkey "${shortcut}"`)
                else hotkey.key = key
            }
            return hotkey
        }))
}

function tokenize(chord: string): string[] {
    // The `+` key: "+", "ctrl++"
    if (chord === "+") return ["+"]
    if (chord.endsWith("++")) return [...chord.slice(0, -2).split("+"), "+"]
    return chord.split("+")
}
