import type { Binding, Dispose, Hotkey } from "../types"
import { bindings } from "./bindings"
import { normalize } from "./normalize"
import { vsc } from "./vsc"

export function bind<T extends Hotkey>(hotkeys: T[] | string, callback: () => void): Dispose {
    const h = typeof hotkeys === "string" ? vsc(hotkeys) : normalize(hotkeys)
    const binding: Binding = { callback, hotkeys: h }
    bindings.add(binding)
    return () => void bindings.delete(binding)
}
