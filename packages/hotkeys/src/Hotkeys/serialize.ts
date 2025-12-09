import type { Hotkey } from "../types"
import { normalize } from "./normalize"

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
