import { copySync } from "fs-extra"
import { resolve } from "path"

export default function () {
  copySync(
    resolve(__dirname, "../../../", "functions/src/assets"),
    resolve(__dirname, "../../../", "functions/lib/functions/src/assets")
  )
}
