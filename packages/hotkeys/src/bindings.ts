import type { Binding, HotkeysConfig, HotkeysMap } from './types.js'

export function* bindings<T extends HotkeysConfig>(
    target: HotkeysMap<T>,
): Generator<Binding<T>> {
    const stack = [target]
    while (stack.length) {
        const next = stack.shift()!
        for (const shortcut of next.values()) {
            for (const binding of shortcut.bindings) yield binding
            stack.push(shortcut.shortcuts)
        }
    }
}
