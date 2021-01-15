#!/usr/bin/env node
import program from "commander"
import { existsSync } from "fs-extra"
import { resolve } from "path"
import { exec } from "shelljs"

export default function main() {
  program.option("-c, --configuration <configuration>", "e.g. production")
  program.parse(process.argv)

  // Set the service account data as a config variable.
  const { PATH_TO_APPLICATION_CREDENTIALS_JSON } = process.env
  const serviceAccountJson = require(PATH_TO_APPLICATION_CREDENTIALS_JSON!)
  const serviceAccountJsonString = JSON.stringify(serviceAccountJson)
  const serviceAccountBase64 = Buffer.from(serviceAccountJsonString).toString(
    "base64",
  )
  const pathToRuntimeconfig = resolve(
    __dirname,
    "../../",
    ".funk/build-pipeline-output/api-build/.runtimeconfig.json",
  )

  let cachedServiceAccountBase64: string
  let shouldSetConfig = true

  if (existsSync(pathToRuntimeconfig)) {
    cachedServiceAccountBase64 = require(pathToRuntimeconfig).admin
      .serializedcredentials
    shouldSetConfig = serviceAccountBase64 !== cachedServiceAccountBase64
  }

  if (shouldSetConfig) {
    exec(`firebase functions:config:set \
      admin.serializedcredentials=${serviceAccountBase64}`)
    exec(
      "firebase functions:config:get > .funk/build-pipeline-output/api-build/.runtimeconfig.json",
    )
  }
}

if (require.main === module) {
  main()
}
