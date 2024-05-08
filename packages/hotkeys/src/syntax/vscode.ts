import type { Hotkey } from '../types.js'
import { isAltKey, isCtrlKey, isMetaKey, isShiftKey, resolveKey } from '../keys.js'
import { normalizeHotkey } from '../normalizeHotkey.js'
import { addShortcutFactory, addShortcutsFactory, createBindingFactory, createBindingsFactory } from './factory.js'

const separator = /\s+/g
const key = /(?<!\+)\+/g

export function parseShortcut(shortcut: string): Hotkey[] {
    return shortcut
        .trim()
        .split(separator)
        .map(shortcut => shortcut
            .split(key)
            .map(resolveKey)
            .reduce((acc, key) => {
                if (isMetaKey(key)) acc.meta = true
                else if (isCtrlKey(key)) acc.ctrl = true
                else if (isAltKey(key)) acc.alt = true
                else if (isShiftKey(key)) acc.shift = true
                else acc.key = key
                return acc
            }, {} as Hotkey))
        .map(normalizeHotkey)
}

export const createBinding = createBindingFactory(parseShortcut)
export const createBindings = createBindingsFactory(parseShortcut)
export const addShortcut = addShortcutFactory(parseShortcut)
export const addShortcuts = addShortcutsFactory(parseShortcut)
