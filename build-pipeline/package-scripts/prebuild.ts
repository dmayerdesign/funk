import program from "commander"
import writeConfig from "../code-gen/scripts/write-config"
import writeValidators from "../code-gen/scripts/write-validators"

program.option("-c, --configuration <configuration>", "e.g. production")
program.parse(process.argv)
const { configuration } = program.opts()

writeConfig(configuration)
writeValidators()
