let override: "ctrl" | "meta" | undefined

/**
 * # mod
 *
 * ```ts
 * function Hotkeys.mod(modifier?: "meta" | "ctrl" | null): "meta" | "ctrl"
 * ```
 *
 * Returns what the `mod` modifier stands for: `meta` (Command) on Apple platforms, `ctrl` everywhere else.
 *
 * `mod` is resolved when a hotkey is parsed. Passing a modifier overrides the detection, eg. for tests, passing `null` restores it.
 *
 * ## Example
 *
 * ```ts
 * import { Hotkeys } from "@monstermann/hotkeys";
 *
 * Hotkeys.mod(); // "meta" on macOS, "ctrl" on Windows and Linux
 *
 * Hotkeys.vsc("mod+k");
 * // macOS: [{ meta: true, key: "k" }]
 * // Windows, Linux: [{ ctrl: true, key: "k" }]
 *
 * Hotkeys.mod("ctrl");
 * Hotkeys.vsc("mod+k"); // [{ ctrl: true, key: "k" }]
 * ```
 */
export function mod(modifier?: "ctrl" | "meta" | null): "ctrl" | "meta" {
    if (modifier !== undefined) override = modifier ?? undefined
    if (override) return override
    const platform = typeof navigator === "undefined" ? "" : navigator.platform
    return /Mac|iPhone|iPad/.test(platform) ? "meta" : "ctrl"
}
