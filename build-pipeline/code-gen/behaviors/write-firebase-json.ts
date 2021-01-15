#!/usr/bin/env node
import { writeFileSync } from "fs-extra"
import { resolve } from "path"
import { configToJson } from "../../../configuration/helpers/configuration-to-json"
import { Configuration } from "../../../model/configuration"
import { construct } from "../templates/configuration-firebase.json"

export default function (configuration: Configuration) {
  const firebaseJsonTemplate = construct(configuration)
  const { CLOUD_PROJECT_ID } = configToJson(configuration)

  writeFileSync(
    resolve(__dirname, "../../../firebase.json"),
    firebaseJsonTemplate(CLOUD_PROJECT_ID),
  )
}
