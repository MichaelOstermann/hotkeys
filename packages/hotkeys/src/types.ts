/** A key together with the modifiers that have to be held, see `Hotkeys.normalize`. */
export type Hotkey = Partial<{
    alt: boolean
    ctrl: boolean
    key: string
    meta: boolean
    shift: boolean
}>

/** What is needed from a `KeyboardEvent`. */
export interface HotkeyEvent {
    altKey: boolean
    code: string
    ctrlKey: boolean
    isComposing?: boolean
    key: string
    metaKey: boolean
    shiftKey: boolean
    getModifierState?: (key: string) => boolean
}

export interface Binding {
    hotkeys: Hotkey[]
    callback: () => void
}

export type Bindings = Set<Binding>

export interface Dispose {
    (): void
}
