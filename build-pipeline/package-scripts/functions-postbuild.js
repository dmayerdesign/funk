#!/usr/bin/env node
const { exec } = require('shelljs')
const writeFunctionsAssets = require('../code-gen/scripts/write-functions-assets')
const writeFunctionsIndex = require('../code-gen/scripts/write-functions-index')

// Generate index.js for our functions.
writeFunctionsIndex()

// Copy the `assets` folder.
writeFunctionsAssets()

// Apply tsconfig.json's `paths` to compiled JS.
exec('tscpaths -p ./functions/tsconfig.build.json -s . -o ./functions/lib')
