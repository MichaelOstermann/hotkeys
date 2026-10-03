import type { Hotkey, HotkeyEvent } from "../types"
import { Key } from "../Key"
import { physicalKey } from "./internals/physicalKey"

const asciiLetterOrDigit = /^[a-z\d]$/i

/**
 * # matches
 *
 * ```ts
 * function Hotkeys.matches(hotkey: Hotkey, event: KeyboardEvent): boolean
 * ```
 *
 * Whether a keyboard event is the given, normalized hotkey.
 *
 * - `ctrl`, `alt` and `meta` have to be exactly as the hotkey says.
 * - When the event reports a latin letter or a digit, that is what is compared, and `shift` has to be as the hotkey says.
 *   This follows the layout: `z` is the key that types a "z".
 * - Otherwise either the reported character or the physical key can match:
 *   - The reported character ignores `shift`, as symbols need it on some layouts and not on others: `?` matches whatever types a "?".
 *   - The physical key is the one a US keyboard has in that place, with `shift` as the hotkey says:
 *     `ctrl+c` works on a cyrillic layout, `alt+a` on macOS where it types "å", `shift+1` where it types "!".
 * - Named keys such as `Enter` or `ArrowDown` are compared by name, with `shift` as the hotkey says.
 * - Events during text composition (IME) never match.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * const [hotkey] = Hotkeys.vsc("mod+k");
 *
 * document.addEventListener("keydown", (event) => {
 *     if (Hotkeys.matches(hotkey, event)) console.log("Triggered!");
 * });
 * ```
 */
export function matches(hotkey: Hotkey, event: HotkeyEvent): boolean {
    if (event.isComposing || event.key === "Process") return false

    const key = hotkey.key
    const eventKey = Key.resolve(event.key || "Unidentified")
    const altGraph = event.getModifierState?.("AltGraph") === true

    const meta = !!hotkey.meta === event.metaKey
    const ctrlAlt = !!hotkey.ctrl === event.ctrlKey && !!hotkey.alt === event.altKey
    const shift = !!hotkey.shift === event.shiftKey

    if (!meta) return false

    // Only modifiers: { ctrl: true }
    if (!key) return ctrlAlt && shift && Key.isModifier(eventKey)

    // Named keys: Enter, ArrowDown, Numpad1
    if (Key.isSpecial(key)) return ctrlAlt && shift && (key === eventKey || key === event.code)

    if (asciiLetterOrDigit.test(eventKey)) return ctrlAlt && shift && key === eventKey.toLowerCase()

    // AltGr is reported as ctrl+alt on Windows, the character it types has neither.
    const typed = altGraph ? !hotkey.ctrl && !hotkey.alt : ctrlAlt
    if (typed && Array.from(eventKey).length === 1 && key === eventKey.toLowerCase()) {
        // Letters outside of the latin alphabet have a case, symbols do not.
        return eventKey.toLowerCase() === eventKey.toUpperCase() || shift
    }

    return ctrlAlt && shift && key === physicalKey(event.code)
}
