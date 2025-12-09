import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

export function isAlt(key: string): boolean {
    return resolve(key) === modifiers.alt
}
