import type { HasOptionalKeys, HasRequiredKeys, SetOptional } from 'type-fest'

export type Hotkey = Partial<{
    meta: boolean
    ctrl: boolean
    alt: boolean
    shift: boolean
    key: string
}>

export type EventContext<T extends HotkeysConfig> = T['EventContext']
export type DefaultEventContext<T extends HotkeysConfig> = T['DefaultEventContext']
export type BindingContext<T extends HotkeysConfig> = T['BindingContext']
export type DefaultBindingContext<T extends HotkeysConfig> = T['DefaultBindingContext']

export type ResolveBindingContext<T extends HotkeysConfig> = SetOptional<BindingContext<T>, keyof DefaultBindingContext<T>>
export type ResolveEventContext<T extends HotkeysConfig> = SetOptional<EventContext<T>, keyof DefaultEventContext<T>>

export type InferEventContext<T> = T extends Hotkeys<infer U> ? EventContext<U> : never
export type InferDefaultEventContext<T> = T extends Hotkeys<infer U> ? DefaultEventContext<U> : never
export type InferResolvedEventContext<T> = T extends Hotkeys<infer U> ? ResolveEventContext<U> : never
export type InferBindingContext<T> = T extends Hotkeys<infer U> ? BindingContext<U> : never
export type InferDefaultBindingContext<T> = T extends Hotkeys<infer U> ? DefaultBindingContext<U> : never
export type InferResolvedBindingContext<T> = T extends Hotkeys<infer U> ? ResolveBindingContext<U> : never

export type HotkeysConfig = {
    EventContext: Record<string, any>
    DefaultEventContext: Record<string, any>
    BindingContext: Record<string, any>
    DefaultBindingContext: Record<string, any>
}

export type HotkeysMap<T extends HotkeysConfig> = Map<string, HotkeysEntry<T>>
export type HotkeysEntry<T extends HotkeysConfig> = {
    bindings: Set<Binding<T>>
    shortcuts: HotkeysMap<T>
}

export type Binding<T extends HotkeysConfig> = {
    hotkeys: Hotkey[]
    callback: BindingCallback<T>
    context: BindingContext<T>
}

export type BindingContextParameter<T extends HotkeysConfig> = HasRequiredKeys<ResolveBindingContext<T>> extends true
    ? [context: ResolveBindingContext<T>]
    : HasOptionalKeys<ResolveBindingContext<T>> extends true
        ? [context: ResolveBindingContext<T>] | []
        : []

export type EventContextParameter<T extends HotkeysConfig> = HasRequiredKeys<EventContext<T>> extends true
    ? [context: EventContext<T>]
    : HasOptionalKeys<EventContext<T>> extends true
        ? [context: EventContext<T>] | []
        : []

export interface BindingCallback<T extends HotkeysConfig> {
    (eventContext: EventContext<T>): any
}
export interface BindingsResolver<T extends HotkeysConfig> {
    (bindings: Binding<T>[], eventContext: EventContext<T>): Binding<T>[]
}
export interface OnExecBindings<T extends HotkeysConfig> {
    (bindings: Binding<T>[], eventContext: EventContext<T>): void
}

export type Hotkeys<T extends HotkeysConfig> = {
    shortcuts: HotkeysMap<T>
    afterExecBindings: OnExecBindings<T>[]
    beforeExecBindings: OnExecBindings<T>[]
    bindingsResolvers: BindingsResolver<T>[]
    defaultBindingContext: DefaultBindingContext<T>
    createDefaultEventContext: () => DefaultEventContext<T>
}
