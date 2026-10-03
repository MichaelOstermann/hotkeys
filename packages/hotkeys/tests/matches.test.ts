import type { HotkeyEvent } from "../src"
import { describe, expect, it } from "bun:test"
import { Hotkeys } from "../src"

type Modifiers = "alt" | "altGraph" | "composing" | "ctrl" | "meta" | "shift"

/** A keyboard event as browsers report it: `ev("c", "KeyC", "ctrl")`. */
function ev(key: string, code: string, ...modifiers: Modifiers[]): HotkeyEvent {
    return {
        altKey: modifiers.includes("alt"),
        code,
        ctrlKey: modifiers.includes("ctrl"),
        isComposing: modifiers.includes("composing"),
        key,
        metaKey: modifiers.includes("meta"),
        shiftKey: modifiers.includes("shift"),
        getModifierState: name => name === "AltGraph" && modifiers.includes("altGraph"),
    }
}

const is = (hotkey: string, event: HotkeyEvent): boolean => Hotkeys.isExactMatch(hotkey, event)

describe("matches", () => {
    it("should match letters and digits as they are reported", () => {
        expect(is("c", ev("c", "KeyC"))).toBe(true)
        expect(is("ctrl+c", ev("c", "KeyC", "ctrl"))).toBe(true)
        expect(is("1", ev("1", "Digit1"))).toBe(true)
        expect(is("c", ev("d", "KeyD"))).toBe(false)
    })

    it("should require ctrl, alt and meta to be exactly as given", () => {
        expect(is("c", ev("c", "KeyC", "ctrl"))).toBe(false)
        expect(is("c", ev("c", "KeyC", "meta"))).toBe(false)
        expect(is("c", ev("c", "KeyC", "alt"))).toBe(false)
        expect(is("ctrl+c", ev("c", "KeyC"))).toBe(false)
        expect(is("ctrl+c", ev("c", "KeyC", "ctrl", "meta"))).toBe(false)
        expect(is("meta+alt+c", ev("c", "KeyC", "alt", "meta"))).toBe(true)
    })

    it("should treat shift as a modifier for letters and digits", () => {
        expect(is("shift+a", ev("A", "KeyA", "shift"))).toBe(true)
        expect(is("A", ev("A", "KeyA", "shift"))).toBe(true)
        expect(is("a", ev("A", "KeyA", "shift"))).toBe(false)
        expect(is("shift+a", ev("a", "KeyA"))).toBe(false)
    })

    it("should not take caps lock for shift", () => {
        expect(is("a", ev("A", "KeyA"))).toBe(true)
        expect(is("shift+a", ev("A", "KeyA"))).toBe(false)
        // Caps lock with shift types a lowercase letter.
        expect(is("shift+a", ev("a", "KeyA", "shift"))).toBe(true)
    })

    it("should follow the layout for latin letters", () => {
        // German: the key right of T types a "z".
        expect(is("z", ev("z", "KeyY"))).toBe(true)
        expect(is("y", ev("z", "KeyY"))).toBe(false)
    })

    it("should use the physical key on layouts without latin letters", () => {
        // Russian: ctrl+с
        expect(is("ctrl+c", ev("с", "KeyC", "ctrl"))).toBe(true)
        expect(is("ctrl+c", ev("с", "KeyC"))).toBe(false)
        expect(is("ctrl+v", ev("с", "KeyC", "ctrl"))).toBe(false)
    })

    it("should match alt with a letter where that types another character", () => {
        // macOS: option+a types "å", option+n is a dead key.
        expect(is("alt+a", ev("å", "KeyA", "alt"))).toBe(true)
        expect(is("alt+n", ev("Dead", "KeyN", "alt"))).toBe(true)
        expect(is("a", ev("å", "KeyA", "alt"))).toBe(false)
        expect(is("å", ev("å", "KeyA", "alt"))).toBe(false)
    })

    it("should match shift with a digit where that types a symbol", () => {
        expect(is("shift+1", ev("!", "Digit1", "shift"))).toBe(true)
        expect(is("1", ev("!", "Digit1", "shift"))).toBe(false)
        expect(is("ctrl+shift+1", ev("!", "Digit1", "ctrl", "shift"))).toBe(true)
    })

    it("should match symbols by what is typed, whether that needs shift or not", () => {
        // US: shift+/ types "?", German: shift+ß does.
        expect(is("?", ev("?", "Slash", "shift"))).toBe(true)
        expect(is("?", ev("?", "Minus", "shift"))).toBe(true)
        expect(is("!", ev("!", "Digit1", "shift"))).toBe(true)
        expect(is("/", ev("/", "Slash"))).toBe(true)
        // German: shift+7 types "/".
        expect(is("ctrl+/", ev("/", "Digit7", "ctrl", "shift"))).toBe(true)
        expect(is("shift+/", ev("?", "Slash", "shift"))).toBe(true)
        expect(is("?", ev("/", "Slash"))).toBe(false)
    })

    it("should match digits on layouts that need shift for them", () => {
        // French: the 1 key types "&", with shift "1".
        expect(is("1", ev("&", "Digit1"))).toBe(true)
        expect(is("&", ev("&", "Digit1"))).toBe(true)
        expect(is("shift+1", ev("1", "Digit1", "shift"))).toBe(true)
        expect(is("1", ev("1", "Digit1", "shift"))).toBe(false)
    })

    it("should match characters typed with AltGr", () => {
        // German: AltGr+q types "@", Windows reports ctrl+alt with it.
        expect(is("@", ev("@", "KeyQ", "ctrl", "alt", "altGraph"))).toBe(true)
        expect(is("@", ev("@", "KeyQ", "altGraph"))).toBe(true)
        expect(is("ctrl+@", ev("@", "KeyQ", "ctrl", "alt", "altGraph"))).toBe(false)
        expect(is("ctrl+alt+q", ev("@", "KeyQ", "ctrl", "alt", "altGraph"))).toBe(true)
        expect(is("@", ev("@", "Digit2", "ctrl", "alt"))).toBe(false)
    })

    it("should treat shift as a modifier for letters outside of the latin alphabet", () => {
        expect(is("ö", ev("ö", "Semicolon"))).toBe(true)
        expect(is("shift+ö", ev("Ö", "Semicolon", "shift"))).toBe(true)
        expect(is("ö", ev("Ö", "Semicolon", "shift"))).toBe(false)
        expect(is(";", ev("ö", "Semicolon"))).toBe(true)
    })

    it("should match named keys by name", () => {
        expect(is("enter", ev("Enter", "Enter"))).toBe(true)
        expect(is("shift+enter", ev("Enter", "Enter", "shift"))).toBe(true)
        expect(is("enter", ev("Enter", "Enter", "shift"))).toBe(false)
        expect(is("space", ev(" ", "Space"))).toBe(true)
        expect(is("esc", ev("Escape", "Escape"))).toBe(true)
        expect(is("up", ev("ArrowUp", "ArrowUp"))).toBe(true)
        expect(is("f5", ev("F5", "F5"))).toBe(true)
        expect(is("enter", ev("Escape", "Escape"))).toBe(false)
    })

    it("should match the numpad by its digits or by name", () => {
        expect(is("1", ev("1", "Numpad1"))).toBe(true)
        expect(is("numpad1", ev("1", "Numpad1"))).toBe(true)
        expect(is("numpad1", ev("End", "Numpad1"))).toBe(true)
        expect(is("numpad1", ev("1", "Digit1"))).toBe(false)
    })

    it("should fall back to the physical key when the key is not reported", () => {
        expect(is("k", ev("Unidentified", "KeyK"))).toBe(true)
        expect(is("k", ev("", "KeyK"))).toBe(true)
    })

    it("should ignore events during text composition", () => {
        expect(is("a", ev("a", "KeyA", "composing"))).toBe(false)
        expect(is("a", ev("Process", "KeyA"))).toBe(false)
    })

    it("should match hotkeys that only consist of modifiers", () => {
        expect(is("ctrl", ev("Control", "ControlLeft", "ctrl"))).toBe(true)
        expect(is("ctrl+shift", ev("Shift", "ShiftLeft", "ctrl", "shift"))).toBe(true)
        expect(is("ctrl", ev("c", "KeyC", "ctrl"))).toBe(false)
        expect(is("c", ev("Control", "ControlLeft", "ctrl"))).toBe(false)
    })
})

describe("isExactMatch", () => {
    it("should match sequences event by event", () => {
        const events = [ev("k", "KeyK", "ctrl"), ev("b", "KeyB", "ctrl")]
        expect(Hotkeys.isExactMatch("ctrl+k ctrl+b", events)).toBe(true)
        expect(Hotkeys.isExactMatch(Hotkeys.vim("<C-k><C-b>"), events)).toBe(true)
        expect(Hotkeys.isExactMatch("ctrl+k", events)).toBe(false)
        expect(Hotkeys.isExactMatch("ctrl+k ctrl+b", events.slice(0, 1))).toBe(false)
        expect(Hotkeys.isExactMatch("ctrl+k ctrl+c", events)).toBe(false)
        expect(Hotkeys.isExactMatch([], [])).toBe(false)
    })
})

describe("isPartialMatch", () => {
    const k = ev("k", "KeyK", "ctrl")
    const b = ev("b", "KeyB", "ctrl")

    it("should match the beginning of a sequence", () => {
        expect(Hotkeys.isPartialMatch("ctrl+k ctrl+b", k)).toBe(true)
        expect(Hotkeys.isPartialMatch("ctrl+k ctrl+b", [k])).toBe(true)
        expect(Hotkeys.isPartialMatch(Hotkeys.vsc("ctrl+k ctrl+b ctrl+c"), [k, b])).toBe(true)
    })

    it("should not match complete sequences, other sequences or nothing", () => {
        expect(Hotkeys.isPartialMatch("ctrl+k ctrl+b", [k, b])).toBe(false)
        expect(Hotkeys.isPartialMatch("ctrl+k", [k])).toBe(false)
        expect(Hotkeys.isPartialMatch("ctrl+a ctrl+b", [k])).toBe(false)
        expect(Hotkeys.isPartialMatch("ctrl+k ctrl+b", [])).toBe(false)
    })
})
