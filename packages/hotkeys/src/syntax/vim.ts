import type { Hotkey } from '../types.js'
import { resolveKey } from '../keys.js'
import { normalizeHotkey } from '../normalizeHotkey.js'
import { addShortcutFactory, addShortcutsFactory, createBindingFactory, createBindingsFactory } from './factory.js'

const separatorRegExp = /<[^<>\s]+>|[\s\S]|^$/g
const keyRegExp = /^<((?:[a-z]-)*)([a-z\d]+|[^<>\s])>$/i

const isMetaKey = (key: string): boolean => key.toLowerCase() === 'd' || isMetaKey(key)
const isCtrlKey = (key: string): boolean => key.toLowerCase() === 'c' || isCtrlKey(key)
const isAltKey = (key: string): boolean => ['a', 'm'].includes(key.toLowerCase()) || isAltKey(key)
const isShiftKey = (key: string): boolean => key.toLowerCase() === 's' || isShiftKey(key)

export function parseShortcut(shortcut: string): Hotkey[] {
    return (shortcut.match(separatorRegExp) ?? []).map((shortcut) => {
        const match = shortcut.match(keyRegExp)

        const hotkey = getModifiers(match).reduce((acc, key) => {
            if (isMetaKey(key)) acc.meta = true
            else if (isCtrlKey(key)) acc.ctrl = true
            else if (isAltKey(key)) acc.alt = true
            else if (isShiftKey(key)) acc.shift = true
            return acc
        }, {} as Hotkey)

        hotkey.key = resolveKey(getKey(match, shortcut))

        return normalizeHotkey(hotkey)
    })
}

export const createBinding = createBindingFactory(parseShortcut)
export const createBindings = createBindingsFactory(parseShortcut)
export const addShortcut = addShortcutFactory(parseShortcut)
export const addShortcuts = addShortcutsFactory(parseShortcut)

function getKey(match: RegExpMatchArray | null, shortcut: string): string {
    return match?.[2] ?? shortcut
}

function getModifiers(match: RegExpMatchArray | null): string[] {
    return match?.[1]?.split('-') ?? []
}
