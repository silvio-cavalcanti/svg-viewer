import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/cli.ts",
  output: {
    file: "dist/cli.js",
    format: "esm",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationMap: false,
    }),
  ],
  external: ["open", "yargs"],
};
