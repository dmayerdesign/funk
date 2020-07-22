import { writeFileSync } from "fs"
import { resolve } from "path"
import packageJsonTemplate from "../templates/functions-package"
import rootPackageJson from "../../../package.json"

export default function()
{
  const packageJson = packageJsonTemplate(rootPackageJson)
  const packageJsonAsString = JSON.stringify(packageJson, null, 2)

  writeFileSync(resolve(__dirname, "../../../", "functions/package.json"), packageJsonAsString)
}
