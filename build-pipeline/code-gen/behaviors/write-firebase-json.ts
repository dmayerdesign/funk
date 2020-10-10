#!/usr/bin/env node
import { copyFileSync } from "fs-extra"
import { resolve } from "path"
import { Configuration } from "../../../model/configuration"

export default function (configuration: Configuration) {
  copyFileSync(
    resolve(__dirname, `../../../configuration/${configuration}.firebase.json`),
    resolve(__dirname, "../../../firebase.json")
  )
}
