import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  dts: true,
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  format: ["esm"],
  entry: {
    index: "bin/index.ts",
    "debounce/index": "src/debounce/index.ts",
    "throttle/index": "src/throttle/index.ts",
    "storage/index": "src/storage/index.ts",
    "intersection/index": "src/intersection/index.ts",
    "fetch/index": "src/fetch/index.ts",
    "localization/index": "src/localization/index.ts",
  },
  target: "es2020",
  treeshake: true,
  splitting: true,
};
