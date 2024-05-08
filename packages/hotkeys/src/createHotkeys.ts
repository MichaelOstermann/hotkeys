import type { Simplify } from 'type-fest'
import type { BindingContext, BindingsResolver, DefaultBindingContext, DefaultEventContext, EventContext, Hotkeys, HotkeysConfig, OnExecBindings } from './types.js'
import { _HotkeysBuilder } from './helpers/HotkeysBuilder.js'

type EmptyConfig = {
    EventContext: Record<never, never>
    DefaultEventContext: Record<never, never>
    BindingContext: Record<never, never>
    DefaultBindingContext: Record<never, never>
}

export interface HotkeysBuilder<T extends HotkeysConfig = EmptyConfig> {
    use: <U extends HotkeysConfig>(plugin: (hotkeys: HotkeysBuilder) => HotkeysBuilder<U>) => HotkeysBuilder<{
        EventContext: Simplify<EventContext<T> & EventContext<U>>
        BindingContext: Simplify<BindingContext<T> & BindingContext<U>>
        DefaultEventContext: Simplify<DefaultEventContext<T> & DefaultEventContext<U>>
        DefaultBindingContext: Simplify<DefaultBindingContext<T> & DefaultBindingContext<U>>
    }>
    eventContext: <U extends Record<string, any>>() => HotkeysBuilder<{
        EventContext: Simplify<EventContext<T> & U>
        BindingContext: BindingContext<T>
        DefaultEventContext: DefaultEventContext<T>
        DefaultBindingContext: DefaultBindingContext<T>
    }>
    defaultEventContext: <U extends Record<string, any>>(eventContext: Partial<U> | (() => Partial<U>)) => HotkeysBuilder<{
        EventContext: EventContext<T>
        BindingContext: BindingContext<T>
        DefaultEventContext: Simplify<DefaultEventContext<T> & U>
        DefaultBindingContext: DefaultBindingContext<T>
    }>
    bindingContext: <U extends Record<string, any>>() => HotkeysBuilder<{
        EventContext: EventContext<T>
        BindingContext: Simplify<BindingContext<T> & U>
        DefaultEventContext: DefaultEventContext<T>
        DefaultBindingContext: DefaultBindingContext<T>
    }>
    defaultBindingContext: <U extends Record<string, any>>(bindingContext: Partial<U>) => HotkeysBuilder<{
        EventContext: EventContext<T>
        BindingContext: BindingContext<T>
        DefaultEventContext: DefaultEventContext<T>
        DefaultBindingContext: Simplify<BindingContext<T> & U>
    }>
    resolveBindings: (resolver: BindingsResolver<T>) => this
    afterExecBindings: (callback: OnExecBindings<T>) => this
    beforeExecBindings: (callback: OnExecBindings<T>) => this
    finalize: () => Hotkeys<T>
}

export function createHotkeys(): Hotkeys<EmptyConfig>
export function createHotkeys<T extends HotkeysConfig>(fn: (hotkeys: HotkeysBuilder) => HotkeysBuilder<T>): Hotkeys<T>
export function createHotkeys(fn?: (hotkeys: HotkeysBuilder) => HotkeysBuilder) {
    const hotkeys = new _HotkeysBuilder() as any
    return (fn ? fn(hotkeys) : hotkeys).finalize()
}
