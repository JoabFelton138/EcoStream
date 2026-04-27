import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ".")
        }
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        coverage: {
            provider: "v8",
            exclude: [
              "components/ui/**",
              "node_modules/**",
              ".next/**",
              "**/*.d.ts",
              "**/*.test.*",
              "lib/types/**",
              "app/layout.tsx",
              "*.config.*"
            ],
        }
    }
});