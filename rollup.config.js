/**
 * Copyright 2021 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "./src/index.ts",
  output: process.env.TARGET_ENV === "node"
    // When targeting Node.js:
    ? [
      // CommonJS modules:
      {
        file: pkg.main,
        format: "cjs",
      },
      // ES modules:
      {
        dir: "dist",
        entryFileNames: "[name].mjs",
        format: "esm",
        preserveModules: true,
      },
    ]
    // When targeting the browser:
    : [
      // CommonJS modules:
      {
        file: pkg.browser,
        entryFileNames: "[name].browser.js",
        format: "cjs",
      },
      // ES modules:
      {
        file: pkg.module,
        format: "esm",
        entryFileNames: "[name].es.js"
      }
    ],
  plugins: [
    typescript({
      // Use our own version of TypeScript, rather than the one bundled with the plugin:
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          module: "esnext",
        },
      },
    }),
    nodeResolve({
      browser: process.env.TARGET_ENV !== "node",
    }),
  ],
  external: [],
};
