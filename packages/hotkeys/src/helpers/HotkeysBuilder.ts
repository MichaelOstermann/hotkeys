export class _HotkeysBuilder {
    #afterExecBindings = new Array<Function>()
    #beforeExecBindings = new Array<Function>()
    #bindingsResolvers = new Array<Function>()
    #defaultBindingContext: object = {}
    #defaultEventContexts = new Array<Function>()

    use(plugin: (hotkeys: this) => this): this {
        return plugin(this)
    }

    eventContext(): this {
        return this
    }

    defaultEventContext(context: object | Function): this {
        const defaultEventContext = typeof context === 'function' ? context : () => context
        this.#defaultEventContexts.push(defaultEventContext)
        return this
    }

    bindingContext(): this {
        return this as any
    }

    defaultBindingContext(context: object): this {
        Object.assign(this.defaultBindingContext, context)
        return this as any
    }

    resolveBindings(resolver: Function): this {
        this.#bindingsResolvers.push(resolver)
        return this
    }

    afterExecBindings(callback: Function): this {
        this.#afterExecBindings.push(callback)
        return this
    }

    beforeExecBindings(callback: Function): this {
        this.#beforeExecBindings.push(callback)
        return this
    }

    finalize() {
        return {
            shortcuts: new Map(),
            afterExecBindings: this.#afterExecBindings,
            beforeExecBindings: this.#beforeExecBindings,
            bindingsResolvers: this.#bindingsResolvers,
            defaultBindingContext: this.#defaultBindingContext,
            createDefaultEventContext: () => this.#defaultEventContexts.reduce((context, createContext) => ({
                ...context,
                ...createContext(),
            }), {}),
        }
    }
}
