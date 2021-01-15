#!/usr/bin/env node
import program from "commander"
import { configToJson } from "../../configuration/helpers/configuration-to-json"
import { Configuration } from "../../model/configuration"
import writeSitemap from "../code-gen/behaviors/write-sitemap"

export default function main() {
  program.option(
    "-c, --configuration <configuration>",
    "e.g. production",
    Configuration.LOCAL,
  )
  program.parse(process.argv)
  const { configuration } = program.opts()
  const { CLIENT_APP_URL } = configToJson(configuration)

  writeSitemap(CLIENT_APP_URL)
}

if (require.main === module) {
  main()
}
