import { aliases } from "./aliases"
import { modifiers } from "./modifiers"
import { special } from "./special"

const keys: Record<string, string> = {
    ...modifiers,
    ...special,
    ...aliases,
}

export function resolve(key: string): string {
    return keys[key]
        ?? keys[key.toLowerCase()]
        ?? key
}
