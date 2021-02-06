const { camelCase } = require("lodash")
const glob = require("fast-glob")
const { resolve } = require("path")

require("./http/plugins/internal/cloud-function/behaviors/runtime/bootstrap")

const functionNameFromEnv = process.env.FUNCTION_NAME

const pathToRoot = resolve(__dirname)
const functionFiles = glob.sync("**/infrastructure/internal/*.js", {
  ignore: [
    "**/node_modules",
    "**/spec/**/*.js",
    "**/*.spec.js",
    "**/steps/**/*.js",
    "**/*.steps.js",
  ],
})
.map((pathFromProjectRoot) => resolve(pathFromProjectRoot))

for (const file of functionFiles) {
  if (
    (!functionNameFromEnv || functionNameFromEnv === functionName) &&
    !file.match(/\/index.js$/gi) &&
    !file.match(/(\/|\.)spec\.js$/gi) &&
    !file.match(/(\/|\.)steps\.js$/gi)
  ) {
    const relativePathToFile = file.split(pathToRoot)[1]
    const abbreviatedPathToFile = relativePathToFile.replace(
      /\/infrastructure\/internal\/(behaviors\/)?/g,
      "-",
    )
    const abbreviatedPathToFileSansExt = abbreviatedPathToFile.substring(
      0,
      abbreviatedPathToFile.lastIndexOf("."),
    )
    const functionName = camelCase(abbreviatedPathToFileSansExt)

    exports[
      functionName
    ] = require(`${API_PATH_ABSOLUTE}/${abbreviatedPathToFile}`).default
  }
}
