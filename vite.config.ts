import { defineConfig } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile()],
  staged: {
    "*": "vp check --fix",
  },
});
