import type { Hotkey } from "../../types"
import { vsc } from "../vsc"

export function parse(hotkeys: Hotkey[] | string): Hotkey[] {
    return typeof hotkeys === "string" ? vsc(hotkeys) : hotkeys
}
