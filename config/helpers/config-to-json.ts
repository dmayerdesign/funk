import { readFileSync } from "fs"
import { resolve } from "path"
import stripComments from "strip-comments"
import { chunk } from "lodash"
import { Configuration } from "../../model/configuration"

export function configToJson(configuration: Configuration)
{
  const configFileName = `config.${configuration || "local"}.ts`
  const configFile = readFileSync(
    resolve(__dirname, "../../config", configFileName),
    { encoding: "utf-8" }
  )
  try
  {
    const configRawString = stripComments(
      configFile.replace(/export /g, ""))
      .replace(/\=/g, "[__SPLIT__]")
      .replace(/(var|const|let)/g, "[__SPLIT__]")
      .replace(/^\[__SPLIT__\]/, "")
      .replace(/(?<!\\)['"`]/g, "")

    const configMap = chunk(
      configRawString.split("[__SPLIT__]").map((element) => element.trim()),
      2
    )
      .reduce(
        (configObject, pair) =>
        {
          configObject[pair[0]] = pair[1]
          return configObject
        },
        { configuration } as any
      )
    const configString = JSON.stringify(configMap, null, 2) + "\n"
    return JSON.parse(configString)
  }
  catch (error)
  {
    console.error(`Failed to parse ${configuration}.config.ts to JSON.`)
    console.error(error)
    return {}
  }
}
