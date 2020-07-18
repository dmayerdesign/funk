import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

export default function()
{
  const indexJsContents = readFileSync(resolve(__dirname, "../templates/functions-index.js"))
  writeFileSync(resolve(__dirname, "../../../", "functions/lib/index.js"), indexJsContents)
}
