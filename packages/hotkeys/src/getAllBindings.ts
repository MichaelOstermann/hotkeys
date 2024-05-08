import { bindings } from './bindings.js'
import { getExactBindings } from './getExactBindings.js'
import { getPartialBindings } from './getPartialBindings.js'
import type { Binding, Hotkey, Hotkeys, HotkeysConfig } from './types.js'

export function getAllBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    sequence?: Hotkey[],
): Binding<T>[] {
    return sequence
        ? [...getExactBindings(hotkeys, sequence), ...getPartialBindings(hotkeys, sequence)]
        : Array.from(bindings(hotkeys.shortcuts))
}
