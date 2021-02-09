import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

export default () => {
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
