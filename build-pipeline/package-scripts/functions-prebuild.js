#!/usr/bin/env node
const { sync: delSync } = require('del')
const { resolve } = require('path')
const { mkdirSync, readFileSync, writeFileSync } = require('fs')
const { exec } = require('shelljs')
const program = require('commander')
const { configToJson } = require('../../config/helpers/config-to-json')

program.option('-c, --configuration <configuration>', 'e.g. production')
program.parse(process.argv)

// Translate `config.*.ts` to JSON.
const { configuration } = program.opts()
const configJson = configToJson(configuration)
const serializedConfig = Buffer.from(JSON.stringify(configJson)).toString('base64')

// Check the cache. If nothing's changed, skip caching.
const cachePath = resolve(__dirname, '../../', '.funk/.cache/functions-prebuild')
const configJsonCachePath = `${cachePath}/configJson`
mkdirSync(cachePath, { recursive: true })
const cacheConfig = () =>
{
  writeFileSync(configJsonCachePath, serializedConfig)
}
const getCache = () =>
{
  try
  { return readFileSync(configJsonCachePath, 'utf8') }
  catch (_)
  { return '' }
}
const configHasChanged = getCache() !== serializedConfig
if (configHasChanged)
{
  // Write `configJson` to the cache.
  cacheConfig()
}

// Set the service account data as a config variable.
const { PATH_TO_SERVICE_ACCOUNT_JSON } = configJson
const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON)
const serviceAccountBase64 = Buffer.from(JSON.stringify(serviceAccountJson)).toString('base64')
exec(`firebase functions:config:set admin.serializedcredentials=` + serviceAccountBase64)

// Delete any existing built output.
try
{ delSync(resolve(__dirname, '../../', 'functions/lib') + '/**') }
catch (_)
{ /* Do nothing. */ }

// Delete `node_modules` if it exists.
try
{ delSync(resolve(__dirname, '../../', 'functions/node_modules') + '/**') }
catch (_)
{ /* Do nothing. */ }
