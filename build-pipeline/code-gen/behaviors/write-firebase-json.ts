#!/usr/bin/env node
import { writeFileSync } from "fs-extra"
import { resolve } from "path"
import { Configuration } from "../../../configuration/domain/configuration"
import { configToJson } from "../../../configuration/helpers/configuration-to-json"
import { construct } from "../templates/configuration-firebase.json"

export default function (configuration: Configuration) {
  const firebaseJsonTemplate = construct(configuration)
  const { CLOUD_PROJECT_ID } = configToJson(configuration)

  writeFileSync(
    resolve(__dirname, "../../../firebase.json"),
    firebaseJsonTemplate(CLOUD_PROJECT_ID),
  )
}
