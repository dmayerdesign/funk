import { copySync } from "fs-extra"
import { resolve } from "path"

export default function () {
  copySync(
    resolve(__dirname, "../../../", "assets/internal"),
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/internal-build/assets",
    ),
  )
}
