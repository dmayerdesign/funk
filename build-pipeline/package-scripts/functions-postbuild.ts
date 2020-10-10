#!/usr/bin/env node
import { exec } from "shelljs"
import { readFileSync, removeSync, writeFileSync } from "fs-extra"
import { resolve } from "path"
import writeFunctionsAssets from "../code-gen/behaviors/write-functions-assets"
import writeFunctionsIndex from "../code-gen/behaviors/write-functions-index"

// Generate index.js for our functions.
writeFunctionsIndex()

// Copy the `assets` folder.
writeFunctionsAssets()

// Apply tsconfig.json's `paths` to compiled JS.
const pathToTsConfigBuild = resolve(
  __dirname,
  "../../",
  "functions/tsconfig.build.json"
)
const pathToTsConfigTmp = resolve(
  __dirname,
  "../../",
  "functions/tsconfig.build.tmp.json"
)
const tsConfigBuild = readFileSync(pathToTsConfigBuild).toString("utf8")
const tsConfigBuildTmp = tsConfigBuild.replace(/\.ts" \]/g, '" ]')
writeFileSync(pathToTsConfigTmp, tsConfigBuildTmp)
exec("tscpaths -p ./functions/tsconfig.build.tmp.json -s . -o ./functions/lib")
removeSync(pathToTsConfigTmp)
