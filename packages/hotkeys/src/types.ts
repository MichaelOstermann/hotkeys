export type Hotkey = Partial<{
    alt: boolean
    ctrl: boolean
    key: string
    meta: boolean
    shift: boolean
}>

export interface Binding {
    hotkeys: Hotkey[]
    callback: () => void
}

export type Bindings = Set<Binding>

export interface Dispose {
    (): void
}
