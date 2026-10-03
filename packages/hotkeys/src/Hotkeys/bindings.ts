import type { Bindings } from "../types"

/**
 * # bindings
 *
 * ```ts
 * const Hotkeys.bindings: Set<Binding>
 * ```
 *
 * Everything that has been registered with `Hotkeys.bind`, in the order of registration.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.bind("mod+k", () => console.log("Triggered!"));
 *
 * document.addEventListener("keydown", (event) => {
 *     for (const binding of Hotkeys.bindings) {
 *         if (!Hotkeys.isExactMatch(binding.hotkeys, event)) continue;
 *         event.preventDefault();
 *         binding.callback();
 *     }
 * });
 * ```
 */
export const bindings: Bindings = new Set()
