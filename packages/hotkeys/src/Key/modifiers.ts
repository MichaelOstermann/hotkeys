import { createKeyMap } from "./internals/createKeyMap"

/**
 * # modifiers
 *
 * ```ts
 * const Key.modifiers: Record<string, string>
 * ```
 *
 * The names of the modifier keys, by their name and its lowercase form.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.modifiers.meta; // "Meta"
 * Key.modifiers.Control; // "Control"
 * ```
 */
export const modifiers = createKeyMap([
    "Meta",
    "Control",
    "Alt",
    "Shift",
])
