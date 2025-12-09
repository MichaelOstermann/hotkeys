import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

export function isMeta(key: string): boolean {
    return resolve(key) === modifiers.meta
}
