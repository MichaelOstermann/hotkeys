![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/min/%40monstermann/react-hotkeys/latest) ![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/%40monstermann/react-hotkeys/latest)

# react-hotkeys

React hooks for `@monstermann/hotkeys`.

## Installation

```sh
npm install @monstermann/hotkeys @monstermann/react-hotkeys
pnpm add @monstermann/hotkeys @monstermann/react-hotkeys
yarn add @monstermann/hotkeys @monstermann/react-hotkeys
```

## Usage

```ts
import { createHotkeys } from '@monstermann/hotkeys'
import { parseShortcut } from '@monstermann/hotkeys/vscode'
import { createShortcutHook, createShortcutsHook } from '@monstermann/react-hotkeys'

export const hotkeys = createHotkeys()
export const useShortcut = createShortcutHook(hotkeys, parseShortcut)
export const useShortcuts = createShortcutsHook(hotkeys, parseShortcut)
```

```ts
export function Component() {
    useShortcut('ctrl+a', callback, bindingContext)
    useShortcuts(['ctrl+a', 'meta+a'], callback, bindingContext)
}
```
