import { modifiers } from "./modifiers"
import { resolve } from "./resolve"

export function isCtrl(key: string): boolean {
    return resolve(key) === modifiers.control
}
