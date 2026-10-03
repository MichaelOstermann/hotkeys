import { createKeyMap } from "./internals/createKeyMap"

/**
 * # special
 *
 * ```ts
 * const Key.special: Record<string, string>
 * ```
 *
 * The names of the keys that are not characters, by their name and its lowercase form: `Enter`, `ArrowDown`, `F1`, `Numpad1`, …
 *
 * ## Example
 *
 * ```ts
 * import { Key } from "@monstermann/hotkeys";
 *
 * Key.special.enter; // "Enter"
 * Key.special.ArrowDown; // "ArrowDown"
 * ```
 */
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export const special = createKeyMap([
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "Backspace",
    "CapsLock",
    "Clear",
    "Delete",
    "End",
    "Enter",
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "F17",
    "F18",
    "F19",
    "F20",
    "F21",
    "F22",
    "F23",
    "F24",
    "Home",
    "Insert",
    "NumLock",
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "NumpadAdd",
    "NumpadComma",
    "NumpadDecimal",
    "NumpadDivide",
    "NumpadEnter",
    "NumpadEqual",
    "NumpadMultiply",
    "NumpadSubtract",
    "PageDown",
    "PageUp",
    "ScrollLock",
    "Space",
    "Tab",
])
