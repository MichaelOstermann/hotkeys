import { createKeyMap } from './helpers/createKeyMap.js'

export const modifierKeys = createKeyMap([
    'Meta',
    'Control',
    'Alt',
    'Shift',
])

// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export const specialKeys = createKeyMap([
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'Backspace',
    'CapsLock',
    'Clear',
    'Delete',
    'End',
    'Enter',
    'Escape',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'F13',
    'F14',
    'F15',
    'F16',
    'F17',
    'F18',
    'F19',
    'F20',
    'F21',
    'F22',
    'F23',
    'F24',
    'Home',
    'Insert',
    'NumLock',
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'NumpadAdd',
    'NumpadComma',
    'NumpadDecimal',
    'NumpadDivide',
    'NumpadEnter',
    'NumpadEqual',
    'NumpadMultiply',
    'NumpadSubtract',
    'PageDown',
    'PageUp',
    'ScrollLock',
    'Space',
    'Tab',
])

export const aliasKeys = {
    'ctrl': modifierKeys.control,
    'cmd': modifierKeys.meta,
    'command': modifierKeys.meta,
    'option': modifierKeys.alt,
    'down': specialKeys.arrowdown,
    'downarrow': specialKeys.arrowdown,
    'left': specialKeys.arrowleft,
    'leftarrow': specialKeys.arrowleft,
    'right': specialKeys.arrowright,
    'rightarrow': specialKeys.arrowright,
    'up': specialKeys.arrowup,
    'uparrow': specialKeys.arrowup,
    'return': specialKeys.enter,
    'cr': specialKeys.enter,
    'ins': specialKeys.insert,
    'bs': specialKeys.backspace,
    'del': specialKeys.delete,
    'esc': specialKeys.escape,
    'pgdn': specialKeys.pagedown,
    'pgup': specialKeys.pageup,
    'gt': '>',
    'lt': '<',
    ' ': specialKeys.space,
}

const keys: Record<string, string> = {
    ...modifierKeys,
    ...specialKeys,
    ...aliasKeys,
}

export function resolveKey(key: string): string {
    return keys[key]
        ?? keys[key.toLowerCase()]
        ?? key
}

export function isModifierKey(key: string): boolean {
    return resolveKey(key) in modifierKeys
}

export function isSpecialKey(key: string): boolean {
    return resolveKey(key) in specialKeys
}

export function isPlainKey(key: string): boolean {
    return !isModifierKey(key)
        && !isSpecialKey(key)
}

export function isMetaKey(key: string): boolean {
    return resolveKey(key) === modifierKeys.meta
}

export function isCtrlKey(key: string): boolean {
    return resolveKey(key) === modifierKeys.control
}

export function isAltKey(key: string): boolean {
    return resolveKey(key) === modifierKeys.alt
}

export function isShiftKey(key: string): boolean {
    return resolveKey(key) === modifierKeys.shift
}
