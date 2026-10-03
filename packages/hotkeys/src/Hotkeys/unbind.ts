import type { Hotkey } from "../types"
import { bindings } from "./bindings"
import { parse } from "./internals/parse"
import { serialize } from "./serialize"

/**
 * # unbind
 *
 * ```ts
 * function Hotkeys.unbind(hotkeys: Hotkey[] | string, callback?: () => void): void
 * ```
 *
 * Removes the bindings for the given hotkeys, or only the one with the given callback.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.bind("mod+k", callback);
 *
 * Hotkeys.unbind("mod+k", callback);
 * Hotkeys.unbind("mod+k");
 * ```
 */
export function unbind<T extends Hotkey>(hotkeys: T[] | string, callback?: () => void): void {
    const h = serialize(parse(hotkeys))
    for (const binding of bindings) {
        if (serialize(binding.hotkeys) !== h) continue
        if (callback && callback !== binding.callback) continue
        bindings.delete(binding)
    }
}
