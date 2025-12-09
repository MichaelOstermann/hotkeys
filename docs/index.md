---
aside: true
---

# hotkeys

<Badge type="info" class="size">
    <span>Minified</span>
    <span>3.20 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>1.30 KB</span>
</Badge>

**Highly flexible keyboard shortcut management for any environment.**

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

Hotkeys.bind("ctrl+a", () => {});

document.addEventListener("keypress", (event) => {
    const hotkeys = Hotkeys.evt(event);
    for (const binding of Hotkeys.bindings) {
        if (Hotkeys.isExactMatch(binding.hotkeys, hotkeys)) binding.callback();
    }
});
```

## Installation

::: code-group

```sh [npm]
npm install @monstermann/hotkeys
```

```sh [pnpm]
pnpm add @monstermann/hotkeys
```

```sh [yarn]
yarn add @monstermann/hotkeys
```

```sh [bun]
bun add @monstermann/hotkeys
```

:::
