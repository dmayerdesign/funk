import { resolve } from "path"
import { Configuration } from "../../model/configuration"

export function configToJson(configuration: Configuration)
{
  const configFileName = resolve(__dirname, "../", `config.${configuration || "local"}.ts`)
  const config = require(configFileName) as typeof import("../config.local")
  try
  {
    return JSON.parse(JSON.stringify(config))
  }
  catch (error)
  {
    console.error(`Failed to parse ${configuration}.config.ts to JSON.`)
    console.error(error)
    return {}
  }
}
