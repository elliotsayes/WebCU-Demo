import { defineConfig } from "vite";
import { comlink } from "vite-plugin-comlink";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [comlink(), nodePolyfills(), react()],
  worker: {
    plugins: () => [comlink()],
  },
});
