const { camelCase } = require("lodash")
const { resolve } = require("path")
const recursiveReaddir = require("recursive-readdir-sync")

require("./api/functions/app/bootstrap")

const API_PATH_RELATIVE = "./api/functions/app"
const API_PATH_ABSOLUTE = resolve(__dirname, API_PATH_RELATIVE)
const functionNameFromEnv = process.env.FUNCTION_NAME

recursiveReaddir(API_PATH_ABSOLUTE).forEach((file) => {
  if (
    (!functionNameFromEnv || functionNameFromEnv === functionName) &&
    !!file.match(/\.js$/gi) &&
    !file.match(/\/index.js$/gi) &&
    !file.match(/(\/|\.)spec\.js$/gi) &&
    !file.match(/(\/|\.)steps\.js$/gi)
  ) {
    const filePathFromParentDir = file.split(API_PATH_ABSOLUTE)[1] || ""
    const filePathFromParentDirSansExt = filePathFromParentDir.substring(
      0,
      filePathFromParentDir.lastIndexOf("."),
    )
    const functionName = camelCase(filePathFromParentDirSansExt)

    exports[
      functionName
    ] = require(`${API_PATH_ABSOLUTE}/${filePathFromParentDir}`).default
  }
})
