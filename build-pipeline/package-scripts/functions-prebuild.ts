#!/usr/bin/env node
import { sync as delSync } from "del"
import { resolve } from "path"
import writeFunctionsPackage from "../code-gen/behaviors/write-functions-package"

// Delete any existing built output.
try {
  delSync(
    resolve(
      __dirname,
      "../../",
      ".funk/build-pipeline-output/functions-build"
    ) + "/**"
  )
} catch (_) {
  /* Do nothing. */
}

writeFunctionsPackage()
