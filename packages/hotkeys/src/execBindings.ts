import type { Binding, EventContextParameter, Hotkeys, HotkeysConfig } from './types.js'

export function execBindings<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    bindings: Binding<T>[],
    ...rest: EventContextParameter<T>
): void {
    let [ctx] = rest
    ctx ??= {}
    for (const cb of hotkeys.beforeExecBindings) cb(bindings, ctx)
    for (const binding of bindings) binding.callback(ctx)
    for (const cb of hotkeys.afterExecBindings) cb(bindings, ctx)
}
