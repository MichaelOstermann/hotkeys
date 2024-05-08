import type { BindingCallback, BindingContextParameter, Hotkey, Hotkeys, HotkeysConfig } from '@monstermann/hotkeys'
import { addBindings } from '@monstermann/hotkeys'
import { useEffect, useMemo } from 'react'
import { updateContexts } from './helpers/updateContexts.js'
import { useBindingCallback } from './helpers/useBindingCallback.js'
import { useBindingContext } from './helpers/useBindingContext.js'
import { useShallowEqualArrays } from './helpers/useShallowEqual.js'

export function createShortcutsHook<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    parseShortcut: (shortcut: string) => Hotkey[],
) {
    return function useShortcuts(
        shortcuts: string[],
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ) {
        const callbackRef = useBindingCallback(callback)
        const shortcutsMemo = useShallowEqualArrays(shortcuts)
        const context = useBindingContext(hotkeys, ...rest)

        const bindings = useMemo(() => shortcuts.map(shortcut => ({
            hotkeys: parseShortcut(shortcut),
            callback: callbackRef,
            context,
        })), [shortcutsMemo])

        useEffect(() => addBindings(hotkeys, bindings), [bindings])
        useEffect(() => updateContexts(bindings, context), [context])
    }
}
