import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/hotkeys/",
    description: "Highly flexible keyboard shortcut management for any environment.",
    title: "hotkeys",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { base: "/Hotkeys/", text: "Hotkeys", items: [
                { link: "bindings", text: "bindings" },
                { link: "bind", text: "bind" },
                { link: "unbind", text: "unbind" },
                { link: "evt", text: "evt" },
                { link: "vsc", text: "vsc" },
                { link: "vim", text: "vim" },
                { link: "normalize", text: "normalize" },
                { link: "serialize", text: "serialize" },
                { link: "isExactMatch", text: "isExactMatch" },
                { link: "isPartialMatch", text: "isPartialMatch" },
            ] },
            { base: "/Key/", text: "Key", items: [
                { link: "aliases", text: "aliases" },
                { link: "modifiers", text: "modifiers" },
                { link: "special", text: "special" },
                { link: "resolve", text: "resolve" },
                { link: "isMeta", text: "isMeta" },
                { link: "isCtrl", text: "isCtrl" },
                { link: "isAlt", text: "isAlt" },
                { link: "isShift", text: "isShift" },
                { link: "isModifier", text: "isModifier" },
                { link: "isSpecial", text: "isSpecial" },
                { link: "isPlain", text: "isPlain" },
            ] },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/hotkeys" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
