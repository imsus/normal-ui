import { defineConfig } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        buttons: "buttons.html",
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
