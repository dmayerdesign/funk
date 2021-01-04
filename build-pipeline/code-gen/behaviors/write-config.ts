#!/usr/bin/env node
import { mkdirpSync, readFileSync, writeFileSync } from "fs-extra"
import { Dictionary, toLower } from 'lodash'
import md5 from "md5"
import { resolve } from "path"
import { configToJson } from "../../../configuration/helpers/configuration-to-json"
import { Configuration } from "../../../model/configuration"

const CACHE_PATH = resolve(__dirname, "../../../", ".funk/.cache/api-prebuild")
const CONFIG_JSON_CACHE_PATH = `${CACHE_PATH}/configJson`

export default function (configuration: Configuration) {
  const configJson = configToJson(configuration)
  const hashedConfigJson = md5(JSON.stringify(configJson))
  let cachedHashedConfigJson: string | undefined
  try {
    cachedHashedConfigJson = readFileSync(CONFIG_JSON_CACHE_PATH, "utf8")
  } catch {}

  if (cachedHashedConfigJson !== hashedConfigJson) {
    writeConfig()
    cacheConfig()
  }

  function writeConfig(): void {
    const developmentConfigPath = resolve(
      __dirname,
      "../../../configuration/development.ts"
    )
    const configPathForEnv = resolve(
      __dirname,
      `../../../configuration/${configuration}.ts`
    )
    const configDirPath = resolve(
      __dirname,
      "../../../.funk/build-pipeline-output/configuration"
    )
    const infraVariablesPath = resolve(
      __dirname,
      "../../../infrastructure/variables.tf"
    )
    const developmentConfigFile =
      '// DO NOT EDIT. This file was generated by the "prebuild" script.\n' +
      readFileSync(developmentConfigPath, { encoding: "utf-8" })
    const configFile =
      '// DO NOT EDIT. This file was generated by the "prebuild" ' +
      "script.\n\n" +
      readFileSync(configPathForEnv, { encoding: "utf-8" })

    mkdirpSync(configDirPath)
    writeFileSync(
      resolve(configDirPath, "test-configuration.ts"),
      developmentConfigFile
    )
    writeFileSync(
      resolve(configDirPath, "development.ts"),
      developmentConfigFile
    )
    writeFileSync(resolve(configDirPath, "configuration.ts"), configFile)

    // Write the all-lowercase config for infrastructure.
    // Read from `infrastructure/variables` and write only the properties declared there.
    const vars = readFileSync(infraVariablesPath, { encoding: "utf-8" })
      .split(/(variable\s+")/g)
      .filter((element) => !!element.trim())
      .map((element) => element.substring(0, element.indexOf("\"")))
    const configJsonAllLower = Object.keys(configJson)
      .filter((key) => vars.includes(toLower(key)))
      .reduce(
        (_configAllLower, key) => {
          _configAllLower[toLower(key)] = configJson[key] ?? ""
          return _configAllLower
        },
        {} as Dictionary<any>
      )
    writeFileSync(
      resolve(configDirPath, "configuration.auto.tfvars.json"),
      JSON.stringify(configJsonAllLower, null, 2)
    )
  }

  function cacheConfig() {
    mkdirpSync(CACHE_PATH)
    writeFileSync(CONFIG_JSON_CACHE_PATH, hashedConfigJson)
  }
}
