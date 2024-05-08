import type { BindingCallback, HotkeysConfig } from '@monstermann/hotkeys'
import { useCallback, useRef } from 'react'

export function useBindingCallback<T extends HotkeysConfig>(
    callback: BindingCallback<T>,
): BindingCallback<T> {
    const ref = useRef(callback)
    ref.current = callback
    return useCallback(ctx => ref.current(ctx), [])
}
