import glob from "fast-glob"
import { readFileSync } from "fs-extra"
import { resolve } from "path"

describe("Import rules", function () {
  const pluginsCodeImportPattern = /.+\/plugins\/.+/g
  const appCodeImportPattern = /.+\/(?<!persistence\/)application\/.+/g
  const infraCodeImportPattern = /.+\/infrastructure\/.+/g
  const internalCodeImportPattern = /.+\/internal\/.+/g
  const externalCodeImportPattern = /.+\/external\/.+/g

  test("model files should not import `plugins` nor `application` nor `infrastructure`", function () {
    const modelFilenames = readFiles("**/model/**/*.ts")
    const modelFiles = modelFilenames.map((modelFilename) =>
      readFileSync(modelFilename, { encoding: "utf-8" }),
    )

    const someFilesImportPluginsCode = modelFiles.some(
      (file) => !!file.match(pluginsCodeImportPattern),
    )
    const someFilesImportAppCode = modelFiles.some(
      (file) => !!file.match(appCodeImportPattern),
    )
    const someFilesImportInfraCode = modelFiles.some(
      (file) => !!file.match(infraCodeImportPattern),
    )

    expect(someFilesImportPluginsCode).toBe(false)
    expect(someFilesImportAppCode).toBe(false)
    expect(someFilesImportInfraCode).toBe(false)
  })

  test("plugin files should not import `application` nor `infrastructure`, with the exception of `persistence`", function () {
    const pluginFilenames = readFiles("**/plugins/**/*.ts")
    const pluginFiles = pluginFilenames.map((pluginFilename) =>
      readFileSync(pluginFilename, { encoding: "utf-8" }),
    )

    const someFilesImportAppCode = pluginFiles.some(
      (file) => !!file.match(appCodeImportPattern),
    )
    const someFilesImportInfraCode = pluginFiles.some(
      (file) => !!file.match(infraCodeImportPattern),
    )

    expect(someFilesImportAppCode).toBe(false)
    expect(someFilesImportInfraCode).toBe(false)
  })

  test("internal code should not import external code", function () {
    const internalFilenames = readFiles("**/internal/**/*.ts")
    const internalFiles = internalFilenames
      .filter((filename) => !filename.includes(__dirname))
      .map((filename) => readFileSync(filename, { encoding: "utf-8" }))

    const someFilesImportExternalFiles = internalFiles.some(
      (file) => !!file.match(externalCodeImportPattern),
    )

    expect(someFilesImportExternalFiles).toBe(false)
  })

  test("external code should not import internal code", function () {
    const externalFilenames = readFiles("**/external/**/*.ts")
    const externalFiles = externalFilenames.map((filename) =>
      readFileSync(filename, { encoding: "utf-8" }),
    )

    const someFilesImportInternalFiles = externalFiles.some(
      (file) => !!file.match(internalCodeImportPattern),
    )

    expect(someFilesImportInternalFiles).toBe(false)
  })
})

function readFiles(pattern: string): string[] {
  return glob
    .sync(pattern, { ignore: ["**/node_modules/**/*"] })
    .map((pathFromProjectRoot) => resolve(pathFromProjectRoot))
}
