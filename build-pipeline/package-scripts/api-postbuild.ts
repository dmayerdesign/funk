#!/usr/bin/env node
import {
  copySync,
  mkdirpSync,
  readFileSync,
  removeSync,
  writeFileSync
} from "fs-extra"
import { resolve } from "path"
import { sync as removeRecursiveSync } from "rimraf"
import { exec } from "shelljs"
import writeFunctionsAssets from "../code-gen/behaviors/write-functions-assets"
import writeFunctionsIndex from "../code-gen/behaviors/write-functions-index"
import writeFunctionsPackage from "../code-gen/behaviors/write-functions-package"

export default function main() {
  // Linux needs the `api-build` dir to exist before copying to it.
  mkdirpSync(
    resolve(__dirname, "../../", ".funk/build-pipeline-output/api-build")
  )

  // Generate index.js for our functions.
  writeFunctionsIndex()

  // Copy the `assets` folder.
  writeFunctionsAssets()

  // Write package.json.
  writeFunctionsPackage()

  // Apply tsconfig.json's `paths` to compiled JS.
  const pathToTsConfigBuild = resolve(
    __dirname,
    "../../",
    "api/functions/tsconfig.build.json"
  )
  const pathToTsConfigTmp = resolve(
    __dirname,
    "../../",
    "api/functions/tsconfig.build.tmp.json"
  )
  const tsConfigBuild = readFileSync(pathToTsConfigBuild).toString("utf8")
  const tsConfigBuildTmp = tsConfigBuild.replace(/\.ts"/g, '"')
  writeFileSync(pathToTsConfigTmp, tsConfigBuildTmp)
  exec(
    "tscpaths -p ./api/functions/tsconfig.build.tmp.json -s . -o ./api/functions/tmp"
  )
  removeSync(pathToTsConfigTmp)

  const pathToTmpBuild = resolve(__dirname, "../../", "api/functions/tmp")
  const pathToFinalBuild = resolve(
    __dirname,
    "../../",
    ".funk/build-pipeline-output/api-build"
  )
  copySync(pathToTmpBuild, pathToFinalBuild, { recursive: true })
  removeRecursiveSync(pathToTmpBuild)
}

if (require.main === module) {
  main()
}
