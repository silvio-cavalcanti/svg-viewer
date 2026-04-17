import {
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  readFileSync,
  chmodSync,
} from "fs";
import { resolve, dirname } from "path";

export function packageOptimizer(options = {}) {
  const { binEntry = "bin/svg-viewer.js", outDir = "dist" } = options;

  return {
    name: "package-optimizer",

    closeBundle() {
      const packageJsonPath = resolve(outDir, "package.json");
      const rootPackageJson = resolve("package.json");

      if (!existsSync(rootPackageJson)) {
        console.warn("package-optimizer: package.json not found in root");
        return;
      }

      const rootPkg = JSON.parse(readFileSync(rootPackageJson, "utf-8"));

      const optimizedPkg = {
        name: rootPkg.name,
        version: rootPkg.version,
        description: rootPkg.description,
        type: rootPkg.type,
        main: "./cli.js",
        bin: "svg-viewer ./bin/svg-viewer.js",
        author: rootPkg.author,
        license: rootPkg.license,
        dependencies: rootPkg.dependencies,
        engines: rootPkg.engines,
      };

      writeFileSync(
        packageJsonPath,
        JSON.stringify(optimizedPkg, null, 2) + "\n",
        "utf-8",
      );

      console.log("package-optimizer: Created optimized package.json");

      if (existsSync(binEntry)) {
        const destBin = resolve(outDir, "bin", "svg-viewer.js");
        const destBinDir = dirname(destBin);

        if (!existsSync(destBinDir)) {
          mkdirSync(destBinDir, { recursive: true });
        }

        let binContent = readFileSync(binEntry, "utf-8");

        binContent = binContent.replace("../dist/cli.js", "../cli.js");

        writeFileSync(destBin, binContent, "utf-8");
        chmodSync(destBin, 0o755);
        console.log("package-optimizer: Copied bin/ to dist/bin/");
      }
    },
  };
}
