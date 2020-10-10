#!/usr/bin/env node
import { sync as delSync } from "del"
import { resolve } from "path"
import writeFunctionsPackage from "../code-gen/behaviors/write-functions-package"

// Delete any existing built output.
try {
  delSync(resolve(__dirname, "../../", "functions/lib") + "/**")
} catch (_) {
  /* Do nothing. */
}

// Delete `node_modules` if it exists.
try {
  delSync(resolve(__dirname, "../../", "functions/node_modules") + "/**")
} catch (_) {
  /* Do nothing. */
}

writeFunctionsPackage()
