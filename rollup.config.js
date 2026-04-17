import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { packageOptimizer } from "./rollup-plugin-package.js";

export default {
  input: "src/cli.ts",
  output: {
    dir: "dist",
    format: "esm",
    banner: "#!/usr/bin/env node",
    entryFileNames: "cli.js",
    chunkFileNames: "[name].js",
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationMap: false,
    }),
    packageOptimizer({
      binEntry: "bin/svg-viewer.js",
      outDir: "dist",
    }),
  ],
  external: ["open", "yargs"],
};
