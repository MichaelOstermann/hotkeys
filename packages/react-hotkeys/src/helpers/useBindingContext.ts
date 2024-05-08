import type { BindingContext, BindingContextParameter, Hotkeys, HotkeysConfig } from '@monstermann/hotkeys'
import { createBindingContext } from '@monstermann/hotkeys'
import { useMemo } from 'react'
import { useShallowEqualObjects } from './useShallowEqual.js'

export function useBindingContext<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    ...rest: BindingContextParameter<T>
): BindingContext<T> {
    const ref = useShallowEqualObjects(rest[0])
    return useMemo(() => createBindingContext(hotkeys, ...rest), [ref])
}
