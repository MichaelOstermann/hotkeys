const symbols: Record<string, string> = {
    Backquote: "`",
    Backslash: "\\",
    BracketLeft: "[",
    BracketRight: "]",
    Comma: ",",
    Equal: "=",
    Minus: "-",
    Period: ".",
    Quote: "'",
    Semicolon: ";",
    Slash: "/",
}

/** The character a physical key has on a US keyboard: `KeyA` → `a`, `Digit1` → `1`, `Slash` → `/`. */
export function physicalKey(code: string): string | undefined {
    if (code.length === 4 && code.startsWith("Key")) return code[3]!.toLowerCase()
    if (code.length === 6 && code.startsWith("Digit")) return code[5]
    return symbols[code]
}
