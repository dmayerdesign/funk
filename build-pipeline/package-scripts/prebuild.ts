import program from "commander"
import { Configuration } from "../../configuration/model/configuration"
import writeConfig from "../code-gen/behaviors/write-config"
import writeFirebaseJson from "../code-gen/behaviors/write-firebase-json"
import writeValidators from "../code-gen/behaviors/write-validators"

export default function main() {
  program.option(
    "-c, --configuration <configuration>",
    "e.g. production",
    Configuration.DEVELOPMENT,
  )
  program.option(
    "-s, --skipCodeGen",
    "skip expensive code generation scripts",
    false,
  )
  program.parse(process.argv)

  const { configuration, skipCodeGen } = program.opts()

  if (!skipCodeGen) {
    writeConfig(configuration)
    writeFirebaseJson(configuration)
    writeValidators()
  }
}

if (require.main === module) {
  main()
}
