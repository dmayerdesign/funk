#!/usr/bin/env node
import program from "commander"
import { readFileSync } from "fs-extra"
import { resolve } from "path"
import { exec } from "shelljs"

import { configToJson } from "../../config/helpers/config-to-json"

program.option("-c, --configuration <configuration>", "e.g. production")
program.parse(process.argv)

// Translate `config.*.ts` to JSON.
const { configuration } = program.opts()
const configJson = configToJson(configuration)

// Set the service account data as a config variable.
const { PATH_TO_SERVICE_ACCOUNT_JSON } = configJson
const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON)
const serviceAccountJsonString = JSON.stringify(serviceAccountJson)
const serviceAccountBase64 = Buffer.from(serviceAccountJsonString).toString("base64")

const cachedServiceAccountBase64 = JSON.parse(
  readFileSync(resolve(__dirname, "../../", "functions/.runtimeconfig.json")).toString("utf-8"))
  .admin.serializedcredentials

if (serviceAccountBase64 !== cachedServiceAccountBase64)
{
  exec(`node_modules/.bin/firebase functions:config:set \
    admin.serializedcredentials=${serviceAccountBase64}`)
  exec("node_modules/.bin/firebase functions:config:get > functions/.runtimeconfig.json")
}
