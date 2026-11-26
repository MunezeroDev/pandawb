import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // CSS minifiers rewrite rgba() colours as 8-bit hex (e.g. alpha .88 -> e0),
  // which shifts some translucent colours slightly. CSS is left unminified so
  // every colour renders exactly as authored (~1 KB more gzipped).
  plugins: [react(), tailwindcss({ optimize: false })],
  build: { cssMinify: false },
  base: "/pandawb/",
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
});
