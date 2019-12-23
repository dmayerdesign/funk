#!/usr/bin/env node
const program = require('commander')
const writeConfig = require('../code-gen/scripts/write-config')

program.option('-c, --configuration <configuration>', 'e.g. production')
program.parse(process.argv)
const { configuration } = program.opts()

writeConfig(configuration)