import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

export function isModifier(key: string): boolean {
    return resolve(key) in modifiers
}
