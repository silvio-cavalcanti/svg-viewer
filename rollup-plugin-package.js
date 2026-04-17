import { writeFileSync, existsSync, readFileSync } from "fs";
import { resolve } from "path";

export function packageOptimizer(options = {}) {
  const { outDir = "dist" } = options;

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

      const binField =
        typeof rootPkg.bin === "string"
          ? { "svg-viewer": rootPkg.bin }
          : rootPkg.bin;

      const optimizedPkg = {
        name: rootPkg.name,
        version: rootPkg.version,
        description: rootPkg.description,
        type: rootPkg.type,
        main: "./cli.js",
        bin: binField,
        author: rootPkg.author,
        license: rootPkg.license,
        repository: rootPkg.repository,
        bugs: rootPkg.bugs,
        homepage: rootPkg.homepage,
        publishConfig: rootPkg.publishConfig,
        dependencies: rootPkg.dependencies,
        engines: rootPkg.engines,
      };

      writeFileSync(
        packageJsonPath,
        JSON.stringify(optimizedPkg, null, 2) + "\n",
        "utf-8",
      );

      console.log("package-optimizer: Created optimized package.json");
    },
  };
}
