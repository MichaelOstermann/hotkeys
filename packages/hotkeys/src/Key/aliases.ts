import { modifiers } from "./modifiers"
import { special } from "./special"

/**
 * # aliases
 *
 * ```ts
 * const Key.aliases: Record<string, string>
 * ```
 *
 * Other names for keys, mapped to the name they stand for: `esc` is `Escape`, `cmd` is `Meta`, `up` is `ArrowUp`.
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.aliases.esc; // "Escape"
 * Key.aliases.cmd; // "Meta"
 * ```
 */
export const aliases = {
    " ": special.space,
    "bksp": special.backspace,
    "bs": special.backspace,
    "caps": special.capslock,
    "cmd": modifiers.meta,
    "command": modifiers.meta,
    "cr": special.enter,
    "ctrl": modifiers.control,
    "del": special.delete,
    "down": special.arrowdown,
    "downarrow": special.arrowdown,
    "esc": special.escape,
    "gt": ">",
    "ins": special.insert,
    "left": special.arrowleft,
    "leftarrow": special.arrowleft,
    "lt": "<",
    "opt": modifiers.alt,
    "option": modifiers.alt,
    "pgdn": special.pagedown,
    "pgup": special.pageup,
    "return": special.enter,
    "right": special.arrowright,
    "rightarrow": special.arrowright,
    "spc": special.space,
    "up": special.arrowup,
    "uparrow": special.arrowup,
}
