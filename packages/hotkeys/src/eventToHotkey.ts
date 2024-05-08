import { normalizeHotkey } from './normalizeHotkey.js'
import type { Hotkey } from './types.js'

export function eventToHotkey(event: KeyboardEvent): Hotkey {
    return normalizeHotkey({
        meta: event.metaKey,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        key: event.key,
    })
}
