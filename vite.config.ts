/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "import.meta.vitest": false,
  },
  test: {
    globals: true,
    includeSource: ["src/**/*.{ts,tsx}"],
    setupFiles: ["test/setup.ts"],
  },
});
