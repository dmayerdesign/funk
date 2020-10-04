import { resolve } from "path"
import { Configuration } from "../../model/configuration"

export function configToJson(configuration: Configuration)
{
  const configFileName = resolve(__dirname, "../", `${configuration || "local"}.ts`)
  const config = require(configFileName)
  try
  {
    return JSON.parse(JSON.stringify(config))
  }
  catch (error)
  {
    console.error(`Failed to parse ${configuration}.ts to JSON.`)
    console.error(error)
    return {}
  }
}
