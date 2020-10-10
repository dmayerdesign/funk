import program from "commander"
import { Configuration } from "../../model/configuration"
import writeConfig from "../code-gen/behaviors/write-config"
import writeFirebaseJson from "../code-gen/behaviors/write-firebase-json"
import writeValidators from "../code-gen/behaviors/write-validators"

program.option(
  "-c, --configuration <configuration>",
  "e.g. production",
  Configuration.DEVELOPMENT
)
program.option(
  "-s, --skipCodeGen",
  "skip expensive code generation scripts",
  false
)
program.parse(process.argv)
const { configuration, skipCodeGen } = program.opts()

writeConfig(configuration)
writeFirebaseJson(configuration)
if (!skipCodeGen) {
  writeValidators()
}
