[← Executing Shortcuts](./executing-shortcuts.md) • [Advanced →](./advanced.md)

---

# Sequences

As shown in [Registering Shortcuts](./registering-shortcuts.md) and [Executing Shortcuts](./executing-shortcuts.md), bindings require a list of `Hotkey`s (representing a hotkey sequence) and you have access to utility functions such as [`getExactBindings`](./executing-shortcuts.md#getexactbindings) or [`getPartialBindings`](./executing-shortcuts.md#getpartialbindings).

However this library comes with no further functionality related to shortcut sequences - there are many different behaviours possible here:

- Supporting [submodes](https://github.com/anuvyklack/hydra.nvim)
- [Displaying a UI](https://github.com/folke/which-key.nvim) for incomplete sequences
- Showing a warning for invalid sequences
- Automatically canceling pending sequences after a timeout
- Explicitly cancel the current sequence by pressing `esc`

## Example

Here is a starting point for how you could implement basic support for sequences:

```ts
import type { Hotkey } from '@monstermann/hotkeys'
import { createHotkeys, eventToHotkey, hasExactBindings, hasPartialBindings } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()

let sequence: Hotkey[] = []

document.addEventListener('keydown', (event) => {
    const hotkey = eventToHotkey(event)
    const nextSequence = [...sequence, hotkey]

    // If we have exact bindings, reset the sequence (and execute the bindings):
    if (hasExactBindings(hotkeys, nextSequence))
        sequence = []

    // If we have bindings that require more keypresses, keep the sequence:
    else if (hasPartialBindings(hotkeys, nextSequence))
        sequence = nextSequence

    // Otherwise reset the sequence:
    else
        sequence = []
})
```

---

[← Executing Shortcuts](./executing-shortcuts.md) • [Advanced →](./advanced.md)
