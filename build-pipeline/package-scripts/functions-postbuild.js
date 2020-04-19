#!/usr/bin/env node
const { exec } = require('shelljs')
const { readFileSync, removeSync, writeFileSync } = require('fs-extra')
const { resolve } = require('path')
const writeFunctionsAssets = require('../code-gen/scripts/write-functions-assets')
const writeFunctionsIndex = require('../code-gen/scripts/write-functions-index')

// Generate index.js for our functions.
writeFunctionsIndex()

// Copy the `assets` folder.
writeFunctionsAssets()

// Apply tsconfig.json's `paths` to compiled JS.
const pathToTsConfigBuild = resolve(__dirname, '../../', 'functions/tsconfig.build.json')
const pathToTsConfigTmp = resolve(__dirname, '../../', 'functions/tsconfig.build.tmp.json')
const tsConfigBuild = readFileSync(pathToTsConfigBuild).toString('utf8')
const tsConfigBuildTmp = tsConfigBuild.replace(/\.ts" \]/g, '" ]')
writeFileSync(pathToTsConfigTmp, tsConfigBuildTmp)
exec('tscpaths -p ./functions/tsconfig.build.tmp.json -s . -o ./functions/lib')
removeSync(pathToTsConfigTmp)
