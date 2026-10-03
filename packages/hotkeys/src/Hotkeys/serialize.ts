import type { Hotkey } from "../types"
import { normalize } from "./normalize"

/**
 * # serialize
 *
 * ```ts
 * function Hotkeys.serialize(hotkeys: Hotkey[]): string
 * ```
 *
 * Turns hotkeys into a string that is the same for the same hotkeys, in the format of `Hotkeys.vsc`.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.serialize([{ ctrl: true, key: "k" }, { shift: true, meta: true, key: "p" }]);
 * // "ctrl+k meta+shift+p"
 *
 * Hotkeys.serialize(Hotkeys.vim("<C-w>v"));
 * // "ctrl+w v"
 * ```
 */
export function serialize<T extends Hotkey>(hotkeys: T[]): string {
    return normalize(hotkeys).map((hotkey) => {
        return [
            hotkey.meta ? "meta" : "",
            hotkey.ctrl ? "ctrl" : "",
            hotkey.alt ? "alt" : "",
            hotkey.shift ? "shift" : "",
            hotkey.key,
        ]
            .filter(s => !!s)
            .join("+")
    }).join(" ")
}
