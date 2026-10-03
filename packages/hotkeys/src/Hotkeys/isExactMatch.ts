import type { Hotkey, HotkeyEvent } from "../types"
import { parse } from "./internals/parse"
import { matches } from "./matches"

/**
 * # isExactMatch
 *
 * ```ts
 * function Hotkeys.isExactMatch(
 *     hotkeys: Hotkey[] | string,
 *     events: KeyboardEvent | KeyboardEvent[],
 * ): boolean
 * ```
 *
 * Whether the keyboard events are exactly the given hotkeys: one event per hotkey, each matching as described in `Hotkeys.matches`.
 *
 * Strings are parsed with `Hotkeys.vsc`.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * document.addEventListener("keydown", (event) => {
 *     if (Hotkeys.isExactMatch("mod+k", event)) console.log("Triggered!");
 * });
 * ```
 */
export function isExactMatch<T extends Hotkey>(hotkeys: T[] | string, events: HotkeyEvent | HotkeyEvent[]): boolean {
    const h = parse(hotkeys)
    const e = Array.isArray(events) ? events : [events]
    if (!h.length || h.length !== e.length) return false
    return h.every((hotkey, i) => matches(hotkey, e[i]!))
}
