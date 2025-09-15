import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    types: "src/types/index.ts",
    utils: "src/utils/index.ts",
    providers: "src/providers/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@tanstack/react-query", "@tanstack/react-query-devtools"],
});
