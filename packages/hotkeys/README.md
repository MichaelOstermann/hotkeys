![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/min/%40monstermann/hotkeys/latest) ![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/%40monstermann/hotkeys/latest)

# hotkeys

Highly flexible keyboard shortcut management for any environment.

This library focuses on providing the data-structure and building blocks necessary to allow you to build _probably™_ anything you can think of regarding shortcuts.

It does so by adopting a code-over-config approach, a range of utility functions that come with no side-effects, or any default behaviour. You are in control of how to parse shortcuts, how to register them, how to match them against keyboard events and how to execute them.

## Motivation

<details>
<summary>
    Sometimes keyboard shortcut management can get <em>a little bit complicated</em>:
</summary>

- Custom shortcut parsing
    - The provided ones may not correctly detect certain keys
    - You would like to use an alternative syntax such as VIM-style shortcuts (`<c-w><left>`)
    - Custom aliases
- Custom event handling
    - You would like to ship shortcuts in non-browser environments such as [react-ink](https://github.com/vadimdemedes/ink), or [terminals](https://github.com/dd-pardal/tty-events)
    - You would like to programmatically trigger shortcuts
    - High control over browser event handling
        - Binding to `document`, a focusable element, React refs, React callbacks, third-party libraries, …
        - Listening to `'keydown'`, `'keyup'`, `'keypress'`, `'input'`, `'beforeinput'`, with or without `{ capture: true }`, …
- Telemetry
    - Tracking shortcut usage
    - Tracking *attempted* shortcut usage (shortcuts that have been tried, but not yet implemented)
- Resolving shortcut conflicts
    - Throwing Exceptions
    - Or using different strategies such as priorities, scopes, layers
- Building a UI around shortcuts
    - Retrieving a list of currently active shortcuts, along with titles, descriptions and SVG icons, to be fed into something like [cmdk](https://github.com/pacocoursey/cmdk) or [kbar](https://github.com/timc1/kbar)
    - Displaying shortcuts using symbols such as `⌘K`
    - Displaying a UI for incomplete shortcut sequences (eg. like [which-key](https://github.com/folke/which-key.nvim))
- Recording and replaying keypresses
    - Filtering out certain keypresses
- Error handling
    - Attaching additional meta-information such as the shortcut
- Sequence management
    - Emulating VSCode's behaviour (Infinite timeouts, warning message for invalid sequences)
    - Emulating VIM's behaviour (`timeoutlen`, `nowait`, canceling partial sequences with `esc`)
- Grouping shortcuts together using scopes, enabling/disabling scopes, etc.
- Disabling specific shortcuts under certain conditions
- Different keybindings enabled only for MacOS/Windows
- Support for sticky keys for accessibility reasons
- Pausing and resuming event listeners
- Skipping between `CompositionStart` & `CompositionEnd` events
- Support user-provided `{ 'ctrl+a': 'CommandName' }` configs similar to VSCode or Zed
- Emulating Emacs' or VIM's concept of (sub)modes (eg. [Hydra.nvim](https://github.com/anuvyklack/hydra.nvim))
</details>

As I have been frequently hitting brick walls trying to go for any of the above, I set out to create this 📦!

## Alternatives

If the above does not resonate with you, you might want to consider alternatives that provide a more out-of-the-box experience, for example:

- [fabiospampinato/shosho](https://github.com/fabiospampinato/shosho) / [fabiospampinato/shortcuts](https://github.com/fabiospampinato/shortcuts)
- [jaywcjlove/hotkeys-js](https://github.com/jaywcjlove/hotkeys-js)
- [JohannesKlaus/react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook)

## Overview

- [**Getting Started**](./docs/getting-started.md)
- [**Hotkey**](./docs/hotkey.md)
    - [Reference](./docs/hotkey.md#reference)
        - [`serializeHotkey`](./docs/hotkey.md#serializehotkey)
        - [`normalizeHotkey`](./docs/hotkey.md#normalizehotkey)
        - [`modifierKeys`](./docs/hotkey.md#modifierkeys)
        - [`specialKeys`](./docs/hotkey.md#specialkeys)
        - [`aliasKeys`](./docs/hotkey.md#aliaskeys)
        - [`resolveKey`](./docs/hotkey.md#resolvekey)
        - [`isModifierKey`](./docs/hotkey.md#ismodifierkey)
        - [`isSpecialKey`](./docs/hotkey.md#isspecialkey)
        - [`isPlainKey`](./docs/hotkey.md#isplainkey)
        - [`isMetaKey`](./docs/hotkey.md#ismetakey)
        - [`isCtrlKey`](./docs/hotkey.md#isctrlkey)
        - [`isAltKey`](./docs/hotkey.md#isaltkey)
        - [`isShiftKey`](./docs/hotkey.md#isshiftkey)
- [**Registering Shortcuts**](./docs/registering-shortcuts.md)
    - [VSCode](./docs/registering-shortcuts.md#vscode)
    - [VIM](./docs/registering-shortcuts.md#vim)
    - [Reference](./docs/registering-shortcuts.md#reference)
        - [`addBinding`](./docs/registering-shortcuts.md#addbinding)
        - [`addBindings`](./docs/registering-shortcuts.md#addbindings)
        - [`removeBinding`](./docs/registering-shortcuts.md#removebinding)
        - [`removeBindings`](./docs/registering-shortcuts.md#removebindings)
        - [`setBindingCallback`](./docs/registering-shortcuts.md#setbindingcallback)
        - [`setBindingCallbacks`](./docs/registering-shortcuts.md#setbindingcallbacks)
- [**Executing Shortcuts**](./docs/executing-shortcuts.md)
    - [Translating Events](./docs/executing-shortcuts.md#translating-events)
    - [Matching Bindings](./docs/executing-shortcuts.md#matching-bindings)
    - [Executing Bindings](./docs/executing-shortcuts.md#executing-bindings)
    - [Reference](./docs/executing-shortcuts.md#reference)
        - [`eventToHotkey`](./docs/executing-shortcuts.md#eventtohotkey)
        - [`hasExactBindings`](./docs/executing-shortcuts.md#hasexactbindings)
        - [`hasPartialBindings`](./docs/executing-shortcuts.md#haspartialbindings)
        - [`hasBindings`](./docs/executing-shortcuts.md#hasbindings)
        - [`getExactBindings`](./docs/executing-shortcuts.md#getexactbindings)
        - [`getPartialBindings`](./docs/executing-shortcuts.md#getpartialbindings)
        - [`getAllBindings`](./docs/executing-shortcuts.md#getallbindings)
        - [`bindings`](./docs/executing-shortcuts.md#bindings)
- [**Sequences**](./docs/sequences.md)
    - [`Example`](./docs/sequences.md#example)
- [**Advanced**](./docs/advanced.md)
    - [**Binding Context**](./docs/binding-context.md)
        - [Defining Contexts](./docs/binding-context.md#defining-contexts)
        - [Accessing Contexts](./docs/binding-context.md#accessing-contexts)
        - [Optional Contexts](./docs/binding-context.md#optional-contexts)
        - [Providing Defaults](./docs/binding-context.md#providing-defaults)
        - [Creating Contexts](./docs/binding-context.md#creating-contexts)
        - [Reference](./docs/binding-context.md#reference)
            - [`config.bindingContext`](./docs/binding-context.md#configbindingcontext)
            - [`config.defaultBindingContext`](./docs/binding-context.md#configdefaultbindingcontext)
            - [`InferBindingContext`](./docs/binding-context.md#inferbindingcontext)
            - [`InferDefaultBindingContext`](./docs/binding-context.md#inferdefaultbindingcontext)
            - [`InferResolvedBindingContext`](./docs/binding-context.md#inferresolvedbindingcontext)
            - [`createBindingContext`](./docs/binding-context.md#createbindingcontext)
            - [`setBindingContext`](./docs/binding-context.md#setbindingcontext)
            - [`setBindingContexts`](./docs/binding-context.md#setbindingcontexts)
    - [**Event Context**](./docs/event-context.md)
        - [Defining Contexts](./docs/event-context.md#defining-contexts)
        - [Accessing Contexts](./docs/event-context.md#accessing-contexts)
        - [Providing Static Defaults](./docs/event-context.md#providing-static-defaults)
        - [Providing Dynamic Defaults](./docs/event-context.md#providing-dynamic-defaults)
        - [Creating Contexts](./docs/event-context.md#creating-contexts)
        - [Reference](./docs/event-context.md#reference)
            - [`config.eventContext`](./docs/event-context.md#configeventcontext)
            - [`config.defaultEventContext`](./docs/event-context.md#configdefaulteventcontext)
            - [`InferEventContext`](./docs/event-context.md#infereventcontext)
            - [`InferDefaultEventContext`](./docs/event-context.md#inferdefaulteventcontext)
            - [`InferResolvedEventContext`](./docs/event-context.md#inferresolvedeventcontext)
            - [`createEventContext`](./docs/event-context.md#createeventcontext)
    - [**Binding Resolvers**](./docs/binding-resolvers.md)
        - [Defining Resolvers](./docs/binding-resolvers.md#defining-resolvers)
        - [Using Resolvers](./docs/binding-resolvers.md#using-resolvers)
        - [Accessing Contexts](./docs/binding-resolvers.md#accessing-contexts)
    - [**Binding Hooks**](./docs/binding-hooks.md)
        - [Defining Hooks](./docs/binding-hooks.md#defining-hooks)
        - [Using Hooks](./docs/binding-hooks.md#using-hooks)
        - [Accessing Contexts](./docs/binding-hooks.md#accessing-contexts)
    - [**Plugins**](./docs/plugins.md)
        - [Creating Plugins](./docs/plugins.md#creating-plugins)
        - [Using Plugins](./docs/plugins.md#using-plugins)
- [**Available Plugins**](./docs/available-plugins.md)
    - [enabled](./docs/plugins/enabled.md)
    - [preventDefault](./docs/plugins/preventDefault.md)
    - [os](./docs/plugins/os.md)
    - [priority](./docs/plugins/priority.md)
