#!/usr/bin/env node
import { sync as delSync } from "del"
import { existsSync, mkdirpSync } from "fs-extra"
import { resolve } from "path"

export default function main() {
  // Delete any existing built output.
  const pathToOldOutput = resolve(
    __dirname,
    "../../",
    ".funk/build-pipeline-output/api-build"
  )
  if (existsSync(pathToOldOutput)) {
    try {
      delSync(pathToOldOutput + "/**")

      mkdirpSync(pathToOldOutput)
    } catch (_) {
      /* Do nothing. */
    }
  }
}

if (require.main === module) {
  main()
}
