import type { validArrayValue } from 'shallow-equal/dist/arrays.js'
import type { validObjectValue } from 'shallow-equal/dist/objects.js'
import { shallowEqualArrays, shallowEqualObjects } from 'shallow-equal'
import { useRef } from 'react'

export function useShallowEqualObjects<T extends validObjectValue>(value: T): T {
    const ref = useRef<T | undefined>(undefined)
    if (!ref.current || !shallowEqualObjects(ref.current, value))
        ref.current = value
    return ref.current
}

export function useShallowEqualArrays<T extends validArrayValue>(value: T): T {
    const ref = useRef<T | undefined>(undefined)
    if (!ref.current || !shallowEqualArrays(ref.current, value))
        ref.current = value
    return ref.current
}
