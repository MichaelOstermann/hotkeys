import type { Binding, BindingContext, HotkeysConfig } from '@monstermann/hotkeys'

export function updateContexts<T extends HotkeysConfig>(
    bindings: Binding<T>[],
    context: BindingContext<T>,
) {
    for (const binding of bindings)
        binding.context = context
}
