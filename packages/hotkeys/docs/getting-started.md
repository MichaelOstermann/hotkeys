# Getting Started

## Installation

```sh
npm install @monstermann/hotkeys
pnpm add @monstermann/hotkeys
yarn add @monstermann/hotkeys
```

## Hotkeys Instance

The `createHotkeys` function acts as the entry point to this library:

```ts
import { createHotkeys } from '@monstermann/hotkeys'

const hotkeys = createHotkeys()
```

You can now start [registering](./registering-shortcuts.md) and [executing](./executing-shortcuts.md) shortcuts!

---

[Hotkey →](./hotkey.md)
