import type { Hotkey } from "../types"
import { normalize } from "./normalize"

export function evt(event: KeyboardEvent): Hotkey[] {
    return normalize([{
        alt: event.altKey,
        ctrl: event.ctrlKey,
        key: event.key,
        meta: event.metaKey,
        shift: event.shiftKey,
    }])
}
