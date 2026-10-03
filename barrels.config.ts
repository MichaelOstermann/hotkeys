import { defineConfig, flat, namespace } from "@monstermann/barrels"

export default defineConfig([
    namespace({
        entries: "./packages/hotkeys/src/[A-Z]*",
    }),
    flat({
        entries: "./packages/hotkeys/src",
        include: ["*.ts", "[A-Z]*/index.js"],
    }),
])
