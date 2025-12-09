import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/hotkeys/src/*",
        exclude: ["**/internals.ts"],
    }),
    flat({
        entries: "./packages/hotkeys/src",
        include: ["*", "*/index.js"],
    }),
])
