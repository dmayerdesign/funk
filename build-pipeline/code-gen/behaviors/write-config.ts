#!/usr/bin/env node
import { mkdirpSync, readFileSync, writeFileSync } from "fs-extra"
import md5 from "md5"
import { resolve } from "path"
import { configToJson } from "../../../configuration/helpers/configuration-to-json"
import { Configuration } from "../../../model/configuration"


const CACHE_PATH = resolve(__dirname, "../../../", ".funk/.cache/functions-prebuild")
const CONFIG_JSON_CACHE_PATH = `${CACHE_PATH}/configJson`

export default function(configuration: Configuration)
{
  const configJson = configToJson(configuration)
  const hashedConfigJson = md5(JSON.stringify(configJson))
  let cachedHashedConfigJson: string | undefined
  try
  { cachedHashedConfigJson = readFileSync(CONFIG_JSON_CACHE_PATH, "utf8") }
  catch
  { }

  if (cachedHashedConfigJson !== hashedConfigJson)
  {
    writeConfig()
    cacheConfig()
  }

  function writeConfig(): void
  {
    const configPathForEnv = resolve(
      __dirname, `../../../configuration/${configuration}.ts`
    )
    const configDirPath = resolve(__dirname, "../../../.funk/build-pipeline-output/configuration")
    const configFile = "// DO NOT EDIT. This file was generated by the \"prebuild\" "
      + "script.\n\n"
      + readFileSync(configPathForEnv, { encoding: "utf-8" })

    mkdirpSync(configDirPath)
    writeFileSync(resolve(configDirPath, "configuration.ts"), configFile)
  }
  function cacheConfig()
  {
    mkdirpSync(CACHE_PATH)
    writeFileSync(CONFIG_JSON_CACHE_PATH, hashedConfigJson)
  }
}
