#!/usr/bin/env node
import program from "commander"
import writeSitemap from "../code-gen/behaviors/write-sitemap"
import { configToJson } from "../../config/helpers/config-to-json"
import { Configuration } from "../../model/configuration"

program.option("-c, --configuration <configuration>", "e.g. production", Configuration.LOCAL)
program.parse(process.argv)
const { configuration } = program.opts()
const { CLIENT_APP_URL } = configToJson(configuration)

writeSitemap(CLIENT_APP_URL)
