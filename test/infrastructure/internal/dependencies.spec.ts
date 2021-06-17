import glob from "fast-glob"
import { readFileSync } from "fs-extra"
import { resolve } from "path"

describe("Import rules", () => {
  const pluginsCodeImportPattern = /.+\/plugins\/.+/g
  const appCodeImportPattern = /.+\/(?<!persistence\/)application\/.+/g
  const infraCodeImportPattern = /.+\/infrastructure\/.+/g
  const internalCodeImportPattern = /.+\/internal\/.+/g
  const externalCodeImportPattern = /.+\/external\/.+/g
  const testCodeImportPattern = /.+(\/test\/|\/spec\/|\.spec|\/spec|\.stubs|\/stubs).+/g

  test("model files must not import `plugins` nor `application` nor `infrastructure`", () => {
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

  test("plugin files must not import `application` nor `infrastructure`, with the exception of `persistence`", () => {
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

  test("internal code must not import external code", () => {
    const internalFilenames = readFiles("**/internal/**/*.ts")
    const internalFiles = internalFilenames
      .filter((filename) => !filename.includes(__dirname))
      .map((filename) => readFileSync(filename, { encoding: "utf-8" }))

    const someFilesImportExternalFiles = internalFiles.some(
      (file) => !!file.match(externalCodeImportPattern),
    )

    expect(someFilesImportExternalFiles).toBe(false)
  })

  test("external code must not import internal code", () => {
    const externalFilenames = readFiles("**/external/**/*.ts")
    const externalFiles = externalFilenames.map((filename) =>
      readFileSync(filename, { encoding: "utf-8" }),
    )

    const someFilesImportInternalFiles = externalFiles.some(
      (file) => !!file.match(internalCodeImportPattern),
    )

    expect(someFilesImportInternalFiles).toBe(false)
  })

  test("production code must not import test code", () => {
    const allTsFilenames = readFiles("**/*.ts")
    const allTsFiles = allTsFilenames.map((filename) => [
      filename,
      readFileSync(filename, { encoding: "utf-8" }),
    ])

    const allowedFilePatterns = [
      "\\/validators\\/main.ts",
      "\\/persistence\\/infrastructure\\/external\\/module.ts",
      "\\/ui\\/infrastructure\\/external\\/app.module.ts",
      "\\/ui\\/infrastructure\\/external\\/main.ts",
      "\\/ui\\/infrastructure\\/external\\/routes.ts",
      "\\/build-pipeline\\/",
      "for-testing.ts",
    ]
    const someProdFilesImportTestFiles = allTsFiles
      .filter(([filename]) =>
        allowedFilePatterns.every(
          (pattern) => !filename.match(new RegExp(pattern, "gi")),
        ),
      )
      .some(
        ([filename, file]) =>
          !filename.includes(".spec.") &&
          !filename.includes("/spec.") &&
          !filename.includes("/spec/") &&
          !filename.includes("/test/") &&
          !filename.includes(".stubs.") &&
          !filename.includes("/stubs.") &&
          !filename.includes("/stubs/") &&
          !!file.match(testCodeImportPattern),
      )

    expect(someProdFilesImportTestFiles).toBe(false)
  })
})

function readFiles(pattern: string): string[] {
  return glob
    .sync(pattern, { ignore: ["**/node_modules/**/*"] })
    .map((pathFromProjectRoot) => resolve(pathFromProjectRoot))
}
