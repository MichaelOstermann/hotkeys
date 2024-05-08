import type { EventContext, Hotkeys, HotkeysConfig, ResolveEventContext } from './types.js'

export function createEventContext<T extends HotkeysConfig>(
    hotkeys: Hotkeys<T>,
    context: ResolveEventContext<T>,
): EventContext<T> {
    return { ...hotkeys.createDefaultEventContext(), ...context }
}
