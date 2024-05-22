<div align="center">

<h1>react-hotkeys</h1>

**React hooks for `@monstermann/hotkeys`.**

![Minified](https://img.shields.io/badge/Minified-1.65_KB-blue)
![Minzipped](https://img.shields.io/badge/Minzipped-0.70_KB-blue)

</div>

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
