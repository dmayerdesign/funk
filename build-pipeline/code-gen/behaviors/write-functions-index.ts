import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

export default function () {
  const indexJsContents = readFileSync(
    resolve(__dirname, "../templates/functions-index.js")
  )
  writeFileSync(
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/functions-build/index.js"
    ),
    indexJsContents
  )
}
