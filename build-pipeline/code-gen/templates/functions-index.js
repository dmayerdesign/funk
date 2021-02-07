const { camelCase } = require("lodash")
const glob = require("fast-glob")
const { resolve } = require("path")

require("./http/plugins/internal/cloud-function/behaviors/runtime/bootstrap")

const functionNameFromEnv = process.env.FUNCTION_NAME

const pathToFunctionsRoot = resolve(__dirname)
const functionsGlobWhenRunningLocally = "**/infrastructure/internal/**/*.js"
const functionsGlob =
  ".funk/build-pipeline-output/internal-build/**/infrastructure/internal/**/*.js"
const functionsGlobIgnore = [
  "**/node_modules",
  "**/spec/**/*.js",
  "**/*.spec.js",
  "**/steps/**/*.js",
  "**/*.steps.js",
]

let functionFilesFromGlob = glob.sync(functionsGlob, {
  ignore: functionsGlobIgnore,
})

if (functionFilesFromGlob.length === 0) {
  functionFilesFromGlob = glob.sync(functionsGlobWhenRunningLocally, {
    ignore: functionsGlobIgnore,
  })
}

const functionFiles = functionFilesFromGlob.map((pathFromProjectRoot) =>
  resolve(pathFromProjectRoot),
)

for (const file of functionFiles) {
  if (
    (!functionNameFromEnv || functionNameFromEnv === functionName) &&
    !file.match(/\/index.js$/gi) &&
    !file.match(/(\/|\.)spec\.js$/gi) &&
    !file.match(/(\/|\.)steps\.js$/gi)
  ) {
    const relativePathToFile = file.split(pathToFunctionsRoot)[1]
    const abbreviatedPathToFile = relativePathToFile.replace(
      /\/infrastructure\/internal\/(behaviors\/)?/g,
      "-",
    )
    const abbreviatedPathToFileSansExt = abbreviatedPathToFile.substring(
      0,
      abbreviatedPathToFile.lastIndexOf("."),
    )
    const functionName = camelCase(abbreviatedPathToFileSansExt)

    exports[functionName] = require(file).default
  }
}
