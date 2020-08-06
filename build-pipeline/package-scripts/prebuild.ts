import program from "commander"
import writeConfig from "../code-gen/behaviors/write-config"
import writeValidators from "../code-gen/behaviors/write-validators"
import { Configuration } from "../../model/configuration"

program.option("-c, --configuration <configuration>", "e.g. production", Configuration.DEVELOPMENT)
program.option("-s, --skipCodeGen", "e.g. production", false)
program.parse(process.argv)
const { configuration, skipCodeGen } = program.opts()

writeConfig(configuration)
if (!skipCodeGen)
{
  writeValidators()
}
