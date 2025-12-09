import type { Hotkey } from "../types"
import { bindings } from "./bindings"
import { serialize } from "./serialize"
import { vsc } from "./vsc"

export function unbind<T extends Hotkey>(hotkeys: T[] | string, callback?: () => void): void {
    const h = serialize(typeof hotkeys === "string" ? vsc(hotkeys) : hotkeys)
    for (const binding of bindings) {
        if (serialize(binding.hotkeys) !== h) continue
        if (callback && callback !== binding.callback) continue
        bindings.delete(binding)
    }
}
