import { addBinding } from '../addBinding.js'
import { addBindings } from '../addBindings.js'
import { createBindingContext } from '../createBindingContext.js'
import type { Binding, BindingCallback, BindingContextParameter, Hotkey, Hotkeys, HotkeysConfig } from '../types.js'

type ShortcutParser = (shortcut: string) => Hotkey[]

export function createBindingFactory(parser: ShortcutParser) {
    return function createBinding<T extends HotkeysConfig>(
        hotkeys: Hotkeys<T>,
        shortcut: string,
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ): Binding<T> {
        return {
            callback,
            hotkeys: parser(shortcut),
            context: createBindingContext(hotkeys, ...rest),
        }
    }
}

export function createBindingsFactory(parser: ShortcutParser) {
    return function createBindings<T extends HotkeysConfig>(
        hotkeys: Hotkeys<T>,
        shortcuts: string[],
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ): Binding<T>[] {
        const context = createBindingContext(hotkeys, ...rest)
        return shortcuts.map(shortcut => ({
            hotkeys: parser(shortcut),
            callback,
            context,
        }))
    }
}

export function addShortcutFactory(parser: ShortcutParser) {
    const createBinding = createBindingFactory(parser)
    return function addShortcut<T extends HotkeysConfig>(
        hotkeys: Hotkeys<T>,
        shortcut: string,
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ): Binding<T> {
        const binding = createBinding(hotkeys, shortcut, callback, ...rest)
        addBinding(hotkeys, binding)
        return binding
    }
}

export function addShortcutsFactory(parser: ShortcutParser) {
    const createBindings = createBindingsFactory(parser)
    return function addShortcuts<T extends HotkeysConfig>(
        hotkeys: Hotkeys<T>,
        shortcuts: string[],
        callback: BindingCallback<T>,
        ...rest: BindingContextParameter<T>
    ): Binding<T>[] {
        const bindings = createBindings(hotkeys, shortcuts, callback, ...rest)
        addBindings(hotkeys, bindings)
        return bindings
    }
}
