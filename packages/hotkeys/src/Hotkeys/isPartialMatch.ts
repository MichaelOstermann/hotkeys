import type { Hotkey, HotkeyEvent } from "../types"
import { parse } from "./internals/parse"
import { matches } from "./matches"

/**
 * # isPartialMatch
 *
 * ```ts
 * function Hotkeys.isPartialMatch(
 *     hotkeys: Hotkey[] | string,
 *     events: KeyboardEvent | KeyboardEvent[],
 * ): boolean
 * ```
 *
 * Whether the keyboard events are the beginning of the given hotkeys, with more to come.
 * This is useful to detect that a user is in the middle of typing a sequence.
 *
 * Strings are parsed with `Hotkeys.vsc`.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * // After the user pressed ctrl+k:
 * Hotkeys.isPartialMatch("ctrl+k ctrl+b", events); // true
 * Hotkeys.isPartialMatch("ctrl+k", events); // false, that is an exact match
 * Hotkeys.isPartialMatch("ctrl+a ctrl+b", events); // false
 * ```
 */
export function isPartialMatch<T extends Hotkey>(hotkeys: T[] | string, events: HotkeyEvent | HotkeyEvent[]): boolean {
    const h = parse(hotkeys)
    const e = Array.isArray(events) ? events : [events]
    if (!e.length || e.length >= h.length) return false
    return e.every((event, i) => matches(h[i]!, event))
}
