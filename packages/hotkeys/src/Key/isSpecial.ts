import { resolve } from "./resolve"
import { special } from "./special"

export function isSpecial(key: string): boolean {
    return resolve(key) in special
}
