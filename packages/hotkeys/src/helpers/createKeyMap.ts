import type { Simplify } from 'type-fest'

type KeyMap<T extends string> = Simplify<
    { [k in T as Lowercase<k>]: k; }
    & { [k in T]: k; }
>

export function createKeyMap<T extends string>(keys: T[]) {
    const entries = keys.flatMap(key => [
        [key.toLowerCase(), key],
        [key, key],
    ])

    return Object.fromEntries(entries) as KeyMap<T>
}
