import type { Hotkey } from "../types"
import { Key } from "../Key"
import { normalize } from "./normalize"

const separatorRegExp = /<[^<>\s]+>|\S/g
const keyRegExp = /^<((?:[a-z]+-)*)([^<>\s]+)>$/i

/**
 * # vim
 *
 * ```ts
 * function Hotkeys.vim(shortcut: string): Hotkey[]
 * ```
 *
 * Parses a vim-style hotkey string.
 *
 * - Plain keys: `a`, `g`, `j`, `k`, with uppercase letters meaning shift: `G`
 * - Modified and named keys: `<C-a>`, `<D-S-k>`, `<M-x>`, `<Esc>`, `<C-CR>`
 * - Sequences: `gg`, `<C-w>v`
 *
 * Modifiers are `D-` (meta), `C-` (ctrl), `A-` or `M-` (alt) and `S-` (shift).
 *
 * Throws for anything that is neither a known name nor a single character.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.vim("<C-a>");
 * // [{ ctrl: true, key: "a" }]
 *
 * Hotkeys.vim("<D-S-k>");
 * // [{ meta: true, shift: true, key: "k" }]
 *
 * Hotkeys.vim("gG");
 * // [{ key: "g" }, { shift: true, key: "g" }]
 *
 * Hotkeys.bind(Hotkeys.vim("<C-w>v"), () => console.log("Triggered!"));
 * ```
 */
export function vim(shortcut: string): Hotkey[] {
    return normalize((shortcut.match(separatorRegExp) ?? []).map((part) => {
        const match = part.match(keyRegExp)
        if (!match) {
            if (part.length > 1) throw new Error(`Invalid hotkey "${shortcut}"`)
            return { key: part }
        }

        const hotkey: Hotkey = { key: match[2]! }
        for (const modifier of match[1]!.split("-").filter(Boolean)) {
            const name = modifier.toLowerCase()
            if (name === "d" || Key.isMeta(modifier)) hotkey.meta = true
            else if (name === "c" || Key.isCtrl(modifier)) hotkey.ctrl = true
            else if (name === "a" || name === "m" || Key.isAlt(modifier)) hotkey.alt = true
            else if (name === "s" || Key.isShift(modifier)) hotkey.shift = true
            else throw new Error(`Unknown modifier "${modifier}"`)
        }
        return hotkey
    }))
}
