<div align="center">

<h1>hotkeys</h1>

**Highly flexible keyboard shortcut management for any environment.**

</div>

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

Hotkeys.bind("mod+k", () => {});
Hotkeys.bind("ctrl+k ctrl+b", () => {});
Hotkeys.bind(Hotkeys.vim("gg"), () => {});

document.addEventListener("keydown", (event) => {
    for (const binding of Hotkeys.bindings) {
        if (!Hotkeys.isExactMatch(binding.hotkeys, event)) continue;
        event.preventDefault();
        binding.callback();
    }
});
```

Nothing listens to the keyboard on its own: you decide where events come from, which bindings apply and what happens with them. For sequences such as `ctrl+k ctrl+b`, collect the events and use `isPartialMatch` to tell whether to keep waiting:

```ts
import { Hotkeys, Key } from "@monstermann/hotkeys";

let events: KeyboardEvent[] = [];

document.addEventListener("keydown", (event) => {
    // Holding down a modifier is not part of a sequence.
    if (Key.isModifier(event.key)) return;
    events.push(event);

    for (const binding of Hotkeys.bindings) {
        if (!Hotkeys.isExactMatch(binding.hotkeys, events)) continue;
        events = [];
        event.preventDefault();
        return binding.callback();
    }

    const isWaiting = Array.from(Hotkeys.bindings).some((binding) =>
        Hotkeys.isPartialMatch(binding.hotkeys, events),
    );

    if (isWaiting) event.preventDefault();
    else events = [];
});
```

## Installation

```sh
bun add @monstermann/hotkeys
```

## Hotkeys

|                                     |                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `ctrl+a`, `meta+shift+k`            | Modifiers are `meta`, `ctrl`, `alt` and `shift`.                          |
| `mod+k`                             | `meta` on Apple platforms, `ctrl` everywhere else.                        |
| `ctrl+k ctrl+b`                     | Sequences are separated by spaces.                                        |
| `enter`, `esc`, `up`, `f5`, `space` | Named keys and their aliases, their case does not matter.                 |
| `K`                                 | An uppercase letter is that letter with `shift`.                          |
| `ctrl++`                            | The plus key.                                                             |
| `Hotkeys.vim("<C-w>v")`             | Vim notation.                                                             |
| `[{ ctrl: true, key: "k" }]`        | What all of the above are parsed into, and what can be passed everywhere. |

Unknown keys throw when a hotkey is parsed, instead of creating a binding that can never be triggered.

## Matching

A hotkey is matched against a keyboard event, taking into account that the same key reports different things depending on the keyboard layout:

- `ctrl`, `alt` and `meta` have to be exactly as the hotkey says.
- When the event reports a latin letter or a digit, that is what is compared, and `shift` has to be as the hotkey says. `z` is the key that types a "z", wherever it is.
- Otherwise the hotkey can match the reported character or the physical key:
    - Symbols match what is typed and ignore `shift`, which they need on some layouts and not on others: `?` matches whatever types a "?".
    - The physical key is the one a US keyboard has in that place, with `shift` as the hotkey says: `ctrl+c` works on a cyrillic layout, `alt+a` on macOS where it types "å", `shift+1` where it types "!".
- Named keys such as `enter` are compared by name, with `shift` as the hotkey says.
- Events during text composition (IME) never match.

## API

Everything is documented with JSDoc, including examples.

|           |                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Hotkeys` | `bind`, `unbind`, `bindings`, `matches`, `isExactMatch`, `isPartialMatch`, `vsc`, `vim`, `normalize`, `serialize`, `mod`   |
| `Key`     | `resolve`, `isModifier`, `isMeta`, `isCtrl`, `isAlt`, `isShift`, `isSpecial`, `isPlain`, `aliases`, `modifiers`, `special` |
