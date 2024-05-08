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

## Documentation

- [`hotkeys`](./packages/hotkeys/README.md#overview)
- [`react-hotkeys`](./packages/react-hotkeys/README.md)
