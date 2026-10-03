import type { Binding, Dispose, Hotkey } from "../types"
import { bindings } from "./bindings"
import { normalize } from "./normalize"
import { vsc } from "./vsc"

/**
 * # bind
 *
 * ```ts
 * function Hotkeys.bind(hotkeys: Hotkey[] | string, callback: () => void): Dispose
 * ```
 *
 * Adds a binding to `Hotkeys.bindings` and returns a function that removes it again.
 *
 * Strings are parsed with `Hotkeys.vsc`. Nothing listens to the keyboard on its own, see `Hotkeys.bindings`.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * const unbind = Hotkeys.bind("mod+k", () => console.log("Triggered!"));
 * Hotkeys.bind(Hotkeys.vim("gg"), () => console.log("Triggered!"));
 *
 * unbind();
 * ```
 */
export function bind<T extends Hotkey>(hotkeys: T[] | string, callback: () => void): Dispose {
    const h = typeof hotkeys === "string" ? vsc(hotkeys) : normalize(hotkeys)
    const binding: Binding = { callback, hotkeys: h }
    bindings.add(binding)
    return () => void bindings.delete(binding)
}
