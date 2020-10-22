import { copySync } from "fs-extra"
import { resolve } from "path"

export default function () {
  copySync(
    resolve(__dirname, "../../../", "api/functions/assets"),
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/api-build/functions/assets"
    )
  )
}
