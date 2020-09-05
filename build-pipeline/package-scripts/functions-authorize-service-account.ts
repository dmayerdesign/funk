#!/usr/bin/env node
import program from "commander"
import { readFileSync } from "fs-extra"
import { resolve } from "path"
import { exec } from "shelljs"

program.option("-c, --configuration <configuration>", "e.g. production")
program.parse(process.argv)

// Set the service account data as a config variable.
const { PATH_TO_SERVICE_ACCOUNT_JSON } = process.env
const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON!)
const serviceAccountJsonString = JSON.stringify(serviceAccountJson)
const serviceAccountBase64 = Buffer.from(serviceAccountJsonString).toString("base64")

const cachedServiceAccountBase64 = JSON.parse(
  readFileSync(resolve(__dirname, "../../", "functions/.runtimeconfig.json")).toString("utf-8"))
  .admin.serializedcredentials

if (serviceAccountBase64 !== cachedServiceAccountBase64)
{
  exec(`firebase functions:config:set \
    admin.serializedcredentials=${serviceAccountBase64}`)
  exec("firebase functions:config:get > functions/.runtimeconfig.json")
}
