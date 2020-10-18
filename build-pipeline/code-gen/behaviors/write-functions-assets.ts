import { copySync } from "fs-extra"
import { resolve } from "path"

export default function () {
  copySync(
    resolve(__dirname, "../../../", "functions/src/assets"),
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/functions-build/functions/src/assets"
    )
  )
}
