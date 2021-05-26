#!/usr/bin/env node
import glob from "fast-glob"
import {
  copySync,
  mkdirpSync,
  readFileSync,
  removeSync,
  writeFileSync,
} from "fs-extra"
import { resolve } from "path"
import { sync as removeRecursiveSync } from "rimraf"
import { exec } from "shelljs"
import writeFunctionsAssets from "../code-gen/behaviors/write-functions-assets"
import writeFunctionsIndex from "../code-gen/behaviors/write-functions-index"
import writeFunctionsPackage from "../code-gen/behaviors/write-functions-package"

export default function main(args: typeof process.argv) {
  // Linux needs the `internal-build` dir to exist before copying to it.
  mkdirpSync(
    resolve(__dirname, "../../", ".funk/build-pipeline-output/internal-build"),
  )

  // Apply tsconfig.json's `paths` to compiled JS.
  const pathToTsConfigBuild = resolve(
    __dirname,
    "../../",
    "tsconfig.build-functions.json",
  )
  const pathToTmpBuild = resolve(
    __dirname,
    "../../",
    ".funk/build-pipeline-output/tmp/internal-build",
  )
  const pathToFinalBuild = resolve(
    __dirname,
    "../../",
    ".funk/build-pipeline-output/internal-build",
  )
  const pathToTsConfigTmp = resolve(
    __dirname,
    "../../",
    "tsconfig.build.tmp.json",
  )
  const tsConfigBuild = readFileSync(pathToTsConfigBuild).toString("utf8")
  const tsConfigBuildTmp = tsConfigBuild.replace(/\.ts"/g, '"')
  writeFileSync(pathToTsConfigTmp, tsConfigBuildTmp)
  exec(`tscpaths -p ./tsconfig.build.tmp.json -s . -o ${pathToTmpBuild}`)
  removeSync(pathToTsConfigTmp)
  copySync(pathToTmpBuild, pathToFinalBuild, { recursive: true })
  removeRecursiveSync(pathToTmpBuild)

  // Remove files causing type conflicts.
  glob
    .sync(
      resolve(
        __dirname,
        "../../",
        "node_modules/node-firestore-import-export/node_modules",
      ) + "/**/types/**/*",
    )
    .forEach((filePath) => {
      removeSync(filePath)
    })

  // Generate index.js for our functions.
  writeFunctionsIndex()

  // Copy the `assets` folder.
  writeFunctionsAssets()

  // Write package.json.
  writeFunctionsPackage()
}

if (require.main === module) {
  main(process.argv)
}
