import type { BindingCallback, BindingContextParameter, Hotkey, Hotkeys, HotkeysConfig } from '@monstermann/hotkeys'
import { addBinding } from '@monstermann/hotkeys'
import { useEffect, useMemo } from 'react'
import { updateContexts } from './helpers/updateContexts.js'
import { useBindingCallback } from './helpers/useBindingCallback.js'
import { useBindingContext } from './helpers/useBindingContext.js'

export function createShortcutHook<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    parseShortcut: (shortcut: string) => Hotkey[],
) {
    return function useShortcut(
        shortcut: string,
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ) {
        const callbackRef = useBindingCallback(callback)
        const context = useBindingContext(hotkeys, ...rest)

        const binding = useMemo(() => ({
            hotkeys: parseShortcut(shortcut),
            callback: callbackRef,
            context,
        }), [shortcut])

        useEffect(() => addBinding(hotkeys, binding), [binding])
        useEffect(() => updateContexts([binding], context), [context])
    }
}
