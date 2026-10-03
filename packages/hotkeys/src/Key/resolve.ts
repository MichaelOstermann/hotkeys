import { aliases } from "./aliases"
import { modifiers } from "./modifiers"
import { special } from "./special"

const keys: Record<string, string> = {
    ...modifiers,
    ...special,
    ...aliases,
}

/**
 * # resolve
 *
 * ```ts
 * function Key.resolve(key: string): string
 * ```
 *
 * Resolves the name of a key, ignoring its case and following aliases. Anything unknown is returned as it is.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.resolve("esc"); // "Escape"
 * Key.resolve("cmd"); // "Meta"
 * Key.resolve("ENTER"); // "Enter"
 * Key.resolve("a"); // "a"
 * ```
 */
export function resolve(key: string): string {
    if (Object.hasOwn(keys, key)) return keys[key]!
    const lower = key.toLowerCase()
    if (Object.hasOwn(keys, lower)) return keys[lower]!
    return key
}
