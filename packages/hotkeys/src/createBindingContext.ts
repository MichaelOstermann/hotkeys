import type { BindingContext, BindingContextParameter, Hotkeys, HotkeysConfig } from './types.js'

export function createBindingContext<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    ...rest: BindingContextParameter<T>
): BindingContext<T> {
    const [context] = rest
    return {
        ...hotkeys.defaultBindingContext,
        ...(context ?? {}),
    }
}
