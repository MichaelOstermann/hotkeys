import { afterEach, describe, expect, it, vi } from "bun:test"
import { Hotkeys, Key } from "../src"

afterEach(() => void Hotkeys.mod(null))

describe("vsc", () => {
    it("should parse keys, modifiers and sequences", () => {
        expect(Hotkeys.vsc("a")).toEqual([{ key: "a" }])
        expect(Hotkeys.vsc("ctrl+a")).toEqual([{ ctrl: true, key: "a" }])
        expect(Hotkeys.vsc("meta+shift+k")).toEqual([{ key: "k", meta: true, shift: true }])
        expect(Hotkeys.vsc("alt+ArrowDown")).toEqual([{ alt: true, key: "ArrowDown" }])
        expect(Hotkeys.vsc(" ctrl+k   ctrl+b ")).toEqual([{ ctrl: true, key: "k" }, { ctrl: true, key: "b" }])
        expect(Hotkeys.vsc("ctrl+shift")).toEqual([{ ctrl: true, shift: true }])
    })

    it("should resolve aliases and ignore the case of names", () => {
        expect(Hotkeys.vsc("cmd+esc")).toEqual([{ key: "Escape", meta: true }])
        expect(Hotkeys.vsc("CTRL+ENTER")).toEqual([{ ctrl: true, key: "Enter" }])
        expect(Hotkeys.vsc("option+up")).toEqual([{ alt: true, key: "ArrowUp" }])
    })

    it("should keep alt and shift", () => {
        expect(Hotkeys.vsc("alt+a")).toEqual([{ alt: true, key: "a" }])
        expect(Hotkeys.vsc("shift+1")).toEqual([{ key: "1", shift: true }])
        expect(Hotkeys.vsc("K")).toEqual([{ key: "k", shift: true }])
    })

    it("should parse the plus key", () => {
        expect(Hotkeys.vsc("+")).toEqual([{ key: "+" }])
        expect(Hotkeys.vsc("ctrl++")).toEqual([{ ctrl: true, key: "+" }])
        expect(Hotkeys.vsc("ctrl+shift++ +")).toEqual([{ ctrl: true, key: "+", shift: true }, { key: "+" }])
    })

    it("should throw for unknown keys and malformed hotkeys", () => {
        expect(() => Hotkeys.vsc("foo+k")).toThrow(`Unknown key "foo"`)
        expect(() => Hotkeys.vsc("ctrl+kk")).toThrow(`Unknown key "kk"`)
        expect(() => Hotkeys.vsc("toString")).toThrow(`Unknown key "toString"`)
        expect(() => Hotkeys.vsc("a+b")).toThrow(`Invalid hotkey "a+b"`)
        expect(() => Hotkeys.vsc("ctrl+")).toThrow(`Invalid hotkey "ctrl+"`)
        expect(() => Hotkeys.vsc("+k")).toThrow(`Invalid hotkey "+k"`)
        expect(() => Hotkeys.vsc("")).toThrow(`Invalid hotkey ""`)
    })

    it("should resolve mod when parsing", () => {
        Hotkeys.mod("meta")
        expect(Hotkeys.vsc("mod+k")).toEqual([{ key: "k", meta: true }])
        Hotkeys.mod("ctrl")
        expect(Hotkeys.vsc("Mod+shift+k")).toEqual([{ ctrl: true, key: "k", shift: true }])
    })
})

describe("mod", () => {
    it("should detect the platform", () => {
        const platform = Object.getOwnPropertyDescriptor(navigator, "platform")
        try {
            Object.defineProperty(navigator, "platform", { configurable: true, value: "MacIntel" })
            expect(Hotkeys.mod()).toBe("meta")
            Object.defineProperty(navigator, "platform", { configurable: true, value: "iPhone" })
            expect(Hotkeys.mod()).toBe("meta")
            Object.defineProperty(navigator, "platform", { configurable: true, value: "Linux x86_64" })
            expect(Hotkeys.mod()).toBe("ctrl")
            Object.defineProperty(navigator, "platform", { configurable: true, value: "Win32" })
            expect(Hotkeys.mod()).toBe("ctrl")
        }
        finally {
            if (platform) Object.defineProperty(navigator, "platform", platform)
        }
    })

    it("should be overridable", () => {
        expect(Hotkeys.mod("meta")).toBe("meta")
        expect(Hotkeys.mod()).toBe("meta")
        expect(Hotkeys.mod("ctrl")).toBe("ctrl")
        expect(Hotkeys.mod()).toBe("ctrl")
    })
})

describe("vim", () => {
    it("should parse keys, modifiers and sequences", () => {
        expect(Hotkeys.vim("j")).toEqual([{ key: "j" }])
        expect(Hotkeys.vim("gg")).toEqual([{ key: "g" }, { key: "g" }])
        expect(Hotkeys.vim("<C-a>")).toEqual([{ ctrl: true, key: "a" }])
        expect(Hotkeys.vim("<D-S-k>")).toEqual([{ key: "k", meta: true, shift: true }])
        expect(Hotkeys.vim("<M-x>")).toEqual([{ alt: true, key: "x" }])
        expect(Hotkeys.vim("<C-w>v")).toEqual([{ ctrl: true, key: "w" }, { key: "v" }])
        expect(Hotkeys.vim("<Esc>")).toEqual([{ key: "Escape" }])
        expect(Hotkeys.vim("<C-CR>")).toEqual([{ ctrl: true, key: "Enter" }])
        expect(Hotkeys.vim("<lt>")).toEqual([{ key: "<" }])
    })

    it("should take uppercase letters for shift", () => {
        expect(Hotkeys.vim("gG")).toEqual([{ key: "g" }, { key: "g", shift: true }])
    })

    it("should throw for unknown keys and modifiers", () => {
        expect(() => Hotkeys.vim("<C-foo>")).toThrow(`Unknown key "foo"`)
        expect(() => Hotkeys.vim("<X-a>")).toThrow(`Unknown modifier "X"`)
    })
})

describe("normalize", () => {
    it("should resolve aliases, modifiers as keys and uppercase letters", () => {
        expect(Hotkeys.normalize([{ key: "esc" }])).toEqual([{ key: "Escape" }])
        expect(Hotkeys.normalize([{ key: "Control" }])).toEqual([{ ctrl: true }])
        expect(Hotkeys.normalize([{ key: "cmd", shift: true }])).toEqual([{ meta: true, shift: true }])
        expect(Hotkeys.normalize([{ key: "A" }])).toEqual([{ key: "a", shift: true }])
        expect(Hotkeys.normalize([{ alt: false, ctrl: true, key: "a", meta: false, shift: false }])).toEqual([{ ctrl: true, key: "a" }])
        expect(() => Hotkeys.normalize([{ key: "foo" }])).toThrow(`Unknown key "foo"`)
    })
})

describe("serialize", () => {
    it("should be the same for the same hotkeys", () => {
        expect(Hotkeys.serialize(Hotkeys.vsc("shift+ctrl+K cmd+esc"))).toBe("ctrl+shift+k meta+Escape")
        expect(Hotkeys.serialize(Hotkeys.vim("<C-w>v"))).toBe("ctrl+w v")
        expect(Hotkeys.serialize([{ key: "A" }])).toBe(Hotkeys.serialize([{ key: "a", shift: true }]))
        expect(Hotkeys.vsc(Hotkeys.serialize(Hotkeys.vsc("ctrl++ alt+shift+up")))).toEqual(Hotkeys.vsc("ctrl++ alt+shift+up"))
    })
})

describe("bind", () => {
    it("should add and remove bindings", () => {
        const a = vi.fn()
        const b = vi.fn()
        const unbind = Hotkeys.bind("ctrl+k", a)
        Hotkeys.bind([{ ctrl: true, key: "k" }], b)
        Hotkeys.bind("ctrl+j", b)
        expect(Array.from(Hotkeys.bindings).map(binding => Hotkeys.serialize(binding.hotkeys))).toEqual(["ctrl+k", "ctrl+k", "ctrl+j"])

        unbind()
        expect(Hotkeys.bindings.size).toBe(2)

        Hotkeys.unbind("ctrl+k", a)
        expect(Hotkeys.bindings.size).toBe(2)
        Hotkeys.unbind("ctrl+k", b)
        expect(Hotkeys.bindings.size).toBe(1)
        Hotkeys.unbind(Hotkeys.vim("<C-j>"))
        expect(Hotkeys.bindings.size).toBe(0)
    })

    it("should throw for unknown keys", () => {
        expect(() => Hotkeys.bind("foo+k", () => {})).toThrow(`Unknown key "foo"`)
        expect(Hotkeys.bindings.size).toBe(0)
    })
})

describe("Key", () => {
    it("should resolve names", () => {
        expect(Key.resolve("esc")).toBe("Escape")
        expect(Key.resolve("ENTER")).toBe("Enter")
        expect(Key.resolve("cmd")).toBe("Meta")
        expect(Key.resolve("a")).toBe("a")
        expect(Key.resolve("constructor")).toBe("constructor")
    })

    it("should classify keys", () => {
        expect(Key.isModifier("option")).toBe(true)
        expect(Key.isMeta("command")).toBe(true)
        expect(Key.isCtrl("ctrl")).toBe(true)
        expect(Key.isAlt("opt")).toBe(true)
        expect(Key.isShift("Shift")).toBe(true)
        expect(Key.isSpecial("pgdn")).toBe(true)
        expect(Key.isSpecial("toString")).toBe(false)
        expect(Key.isPlain("a")).toBe(true)
        expect(Key.isPlain("Enter")).toBe(false)
    })
})
