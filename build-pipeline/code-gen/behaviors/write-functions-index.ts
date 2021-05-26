import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import log from "../../../helpers/log"

export default () => {
  log("Writing `.funk/build-pipeline-output/internal-build/index.js`")
  const indexJsContents = readFileSync(
    resolve(__dirname, "../templates/functions-index.js"),
  )
  writeFileSync(
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/internal-build/index.js",
    ),
    indexJsContents,
  )
}
