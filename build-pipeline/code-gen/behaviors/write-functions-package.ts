import { writeFileSync } from "fs"
import { resolve } from "path"
import rootPackageJson from "../../../package.json"
import packageJsonTemplate from "../templates/functions-package"

export default () => {
  const packageJson = packageJsonTemplate(rootPackageJson)
  const packageJsonAsString = JSON.stringify(packageJson, null, 2)

  writeFileSync(
    resolve(
      __dirname,
      "../../../",
      ".funk/build-pipeline-output/internal-build/package.json",
    ),
    packageJsonAsString,
  )
}
