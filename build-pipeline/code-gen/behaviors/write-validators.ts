import {
  existsSync,
  mkdirpSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs-extra"
import { kebabCase } from "lodash"
import md5 from "md5"
import { resolve, sep } from "path"
import recursiveReaddir from "recursive-readdir-sync"
import * as schemaGenerator from "ts-json-schema-generator"

const CACHE_PATH = resolve(__dirname, "../../../", ".funk/.cache/validators")

export default function () {
  const pathToModel = resolve(__dirname, "../../../model")
  const filenames = recursiveReaddir(pathToModel).filter(
    (filename) => !filename.match(/\/validators\//g)
  )

  const modelEntrypointFilename = resolve(pathToModel, "validators/main.ts")
  mkdirpSync(resolve(pathToModel, "validators"))
  writeFileSync(
    modelEntrypointFilename,
    `/* eslint-disable max-len */
${filenames
  .filter((filename) => filename.endsWith(".ts"))
  .filter((filename) => !filename.includes(".spec."))
  .filter((filename) => !filename.includes("/spec."))
  .filter((filename) => !filename.includes("/validators/"))
  .map(
    (filename) =>
      `import "@funk/model/${filename.split(sep + "model" + sep)[1]}"`
  )
  .join("\n")}\n`
  )

  const generator = schemaGenerator.createGenerator({
    path: modelEntrypointFilename,
    tsconfig: resolve(__dirname, "../../../tsconfig.schema.json"),
    type: "*",
  })

  for (const filename of filenames) {
    const modelDirname = filename.substring(0, filename.lastIndexOf("/"))
    const validatorsDirname = resolve(modelDirname, "validators")
    const fileString = readFileSync(filename).toString("utf-8")

    const interfaceNames = fileString.match(
      new RegExp("(?<=export(\\s)+interface(\\s)+)\\w+", "g")
    )
    interfaceNames?.forEach((interfaceName) => {
      try {
        const schemaDefs = generator.createSchema(interfaceName).definitions!
        const schemaDefFilename = resolve(
          validatorsDirname,
          `${kebabCase(interfaceName)}.schema.json`
        )
        const validator1Filename = resolve(
          validatorsDirname,
          `${kebabCase(interfaceName)}-is-invalid.ts`
        )
        const validator2Filename = resolve(
          validatorsDirname,
          `throw-if-${kebabCase(interfaceName)}-is-invalid.ts`
        )

        // Do nothing if no schema def is found for this interface.
        const schemaDef = schemaDefs[interfaceName]
        if (!schemaDef) return

        // Do nothing if the schema def has not changed since last time.
        const hashedSchemaDef = md5(JSON.stringify(schemaDef))
        const cachedHashedSchemaDefPath = resolve(
          CACHE_PATH,
          `${filename
            .split(sep + "model" + sep)[1]
            .replace(new RegExp(sep, "g"), "_")}_${interfaceName}`
        )
        let cachedHashedSchemaDef: string | undefined
        try {
          cachedHashedSchemaDef = readFileSync(
            cachedHashedSchemaDefPath
          ).toString("utf-8")
        } catch {}
        if (hashedSchemaDef === cachedHashedSchemaDef) return

        // Delete existing validator files.
        if (existsSync(schemaDefFilename)) unlinkSync(schemaDefFilename)
        if (existsSync(validator1Filename)) unlinkSync(validator1Filename)
        if (existsSync(validator2Filename)) unlinkSync(validator2Filename)
        // Write new validator files.
        writeValidators()
        cacheSource()

        function writeValidators(): void {
          mkdirpSync(validatorsDirname)
          console.log("Writing " + schemaDefFilename)
          writeFileSync(
            schemaDefFilename,
            JSON.stringify(schemaDef, null, 2) + "\n"
          )
          console.log("Writing " + validator1Filename)
          writeFileSync(
            validator1Filename,
            `/* eslint-disable max-len */
import { ${interfaceName} } from "@funk/model/${
              filename.split(sep + "model" + sep)[1]
            }"
import schema from "@funk/model/${
              schemaDefFilename.split(sep + "model" + sep)[1]
            }"

export default function(data: ${interfaceName}): string[] | false
{
  const _schema = schema as any
  const requiredProps = (_schema.required ?? []) as (keyof ${interfaceName})[]
  const errors = requiredProps.reduce((_errors, requiredPropName) =>
  {
    if (typeof data[requiredPropName] === "undefined")
    {
      _errors.push(\`Required property \${requiredPropName} is undefined.\`)
    }
    return _errors
  }, [] as string[])
  return errors.length > 0 ? errors : false
}
`
          )
          console.log("Writing " + validator2Filename)
          writeFileSync(
            validator2Filename,
            `/* eslint-disable max-len */
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { ${interfaceName} } from "@funk/model/${
              filename.split(sep + "model" + sep)[1]
            }"
import isInvalid from "@funk/model/${
              modelDirname.split(sep + "model" + sep)[1]
            }` +
              `/validators/${filename
                .split("/")
                .pop()!
                .replace(".ts", "")}-is-invalid"

export function construct()
{
  return function(data: ${interfaceName}): void
  {
    const falseOrErrors = isInvalid(data)
    if (falseOrErrors)
    {
      throw new InvalidInputError(
        "The ${interfaceName} was invalid. Details:\\n" +
        \`  Errors: \${falseOrErrors}\\n\` +
        "  Full path: ${filename
          .split(sep + "model" + sep)[1]
          .replace(".ts", "")}\\n"
      )
    }
  }
}

export default construct()

export type Validate = ReturnType<typeof construct>
`
          )
        }
        function cacheSource() {
          mkdirpSync(CACHE_PATH)
          writeFileSync(cachedHashedSchemaDefPath, hashedSchemaDef)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }
}
