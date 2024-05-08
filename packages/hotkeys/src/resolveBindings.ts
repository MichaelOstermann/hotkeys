import type { Binding, EventContextParameter, Hotkeys, HotkeysConfig } from './types.js'

export function resolveBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    bindings: Binding<T>[],
    ...rest: EventContextParameter<T>
): Binding<T>[] {
    const [ctx] = rest
    return hotkeys.bindingsResolvers.reduce((bindings, resolve) => resolve(bindings, ctx ?? {}), bindings)
}
