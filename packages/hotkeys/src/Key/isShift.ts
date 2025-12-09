import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

export function isShift(key: string): boolean {
    return resolve(key) === modifiers.shift
}
