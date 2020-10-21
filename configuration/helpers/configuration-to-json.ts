import { resolve } from "path"
import { Configuration } from "../../model/configuration"

export function configToJson(configuration: Configuration) {
  const configFileName = resolve(
    __dirname,
    "../",
    `${configuration || "local"}.ts`
  )

  let config: any

  try {
    config = require(configFileName)
    if (!config) throw new Error()
  } catch (error) {
    throw new Error(
      "The configuration was not found. Make sure the string you pass to the `-c/--configuration` "
      + "flag matches the name of a file in the `configuration` folder (e.g. -c development)"
    )
  }

  try {
    return JSON.parse(JSON.stringify(config))
  } catch (error) {
    console.error(`Failed to parse ${configFileName} to JSON.`)
    console.error(error)
    return {}
  }
}
