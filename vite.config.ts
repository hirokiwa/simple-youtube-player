import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const currentDirectory = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(currentDirectory, "index.html"),
        watch: resolve(currentDirectory, "watch/index.html"),
        hide: resolve(currentDirectory, "hide/index.html"),
      },
    },
  },
})
