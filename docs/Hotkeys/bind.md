# bind

```ts
function Hotkeys.bind(hotkeys: Hotkeys[] | string, callback: () => void): Dispose
```

Registers the provided `hotkeys`. If a string is passed, it is parsed via [`Hotkeys.vsc`](./vsc.md) first.

## Example

```ts
import { Hotkeys } from "@monstermann/hotkeys";

const unbind = Hotkeys.bind([{ ctrl: true, key: "a" }], () =>
    console.log("Triggered!"),
);

const unbind = Hotkeys.bind("ctrl+a", () => console.log("Triggered!"));

unbind();
```
