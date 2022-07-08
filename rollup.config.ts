import typescript from "@rollup/plugin-typescript";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import cleaner from "rollup-plugin-cleaner";
import addIIFE from "./rollup-plugin-add-iife";

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    simpleReloader(),
    typescript({ outputToFilesystem: true }),
    cleaner({ targets: ["dist"] }),
    addIIFE({ target: /content/ }),
  ],
};
