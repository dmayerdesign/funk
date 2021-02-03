import glob from "fast-glob"
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
import * as schemaGenerator from "ts-json-schema-generator"
import log from "../../../helpers/log"
import warn from "../../../helpers/warn"

const ROOT_DIR_ABSOLUTE_PATH = resolve(__dirname, "../../../")
const CACHE_PATH = resolve(ROOT_DIR_ABSOLUTE_PATH, ".funk/.cache/validators")

export default function () {
  const filenames = glob
    .sync(ROOT_DIR_ABSOLUTE_PATH + "/!(node_modules)/**/domain/**/*.ts")
    .filter((filename) => !filename.includes(".spec."))
    .filter((filename) => !filename.includes("/spec."))
    .filter((filename) => !filename.includes(".steps."))
    .filter((filename) => !filename.includes("/steps."))
    .filter((filename) => !filename.includes("/validators/"))

  const modelEntrypointFilename = resolve(
    ROOT_DIR_ABSOLUTE_PATH,
    "validators/main.ts",
  )
  mkdirpSync(resolve(ROOT_DIR_ABSOLUTE_PATH, "validators"))
  writeFileSync(
    modelEntrypointFilename,
    `/* eslint-disable max-len */
${filenames
  .map(
    (filename) => `import "@funk${filename.split(ROOT_DIR_ABSOLUTE_PATH)[1]}"`,
  )
  .join("\n")}
`,
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
      new RegExp("(?<=export(\\s)+interface(\\s)+)\\w+", "g"),
    )
    interfaceNames?.forEach((interfaceName) => {
      try {
        const schemaDefs = generator.createSchema(interfaceName).definitions!
        const schemaDefFilename = resolve(
          validatorsDirname,
          `${kebabCase(interfaceName)}.schema.json`,
        )
        const validator1Filename = resolve(
          validatorsDirname,
          `${kebabCase(interfaceName)}-is-invalid.ts`,
        )
        const validator2Filename = resolve(
          validatorsDirname,
          `throw-if-${kebabCase(interfaceName)}-is-invalid.ts`,
        )

        if (!schemaDefs[interfaceName]) return
        // TODO: Un-comment.
        // if (schemaDefHasNotChangedSinceLastBuild()) return

        // Delete existing validator files.
        if (existsSync(schemaDefFilename)) unlinkSync(schemaDefFilename)
        if (existsSync(validator1Filename)) unlinkSync(validator1Filename)
        if (existsSync(validator2Filename)) unlinkSync(validator2Filename)
        // Write new validator files.
        writeValidators()
        cacheSource()

        function writeValidators(): void {
          mkdirpSync(validatorsDirname)
          log("Writing " + schemaDefFilename)
          writeFileSync(
            schemaDefFilename,
            JSON.stringify(schemaDefs[interfaceName], null, 2) + "\n",
          )
          log("Writing " + validator1Filename)
          writeFileSync(
            validator1Filename,
            `/* eslint-disable max-len */
import { ${interfaceName} } from "@funk${filename
              .split(ROOT_DIR_ABSOLUTE_PATH)[1]
              .replace(/\.ts$/, "")}"
import schema from "@funk${schemaDefFilename
              .split(ROOT_DIR_ABSOLUTE_PATH)[1]
              .replace(/\.ts$/, "")}"

export default function (data: ${interfaceName}): string[] | false
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
`,
          )
          log("Writing " + validator2Filename)
          writeFileSync(
            validator2Filename,
            `/* eslint-disable max-len */
import { InvalidInputError } from "@funk/error/domain/invalid-input-error"
import { ${interfaceName} } from "@funk${
              filename.split(ROOT_DIR_ABSOLUTE_PATH)[1]
            }"
import isInvalid from "@funk${modelDirname.split(ROOT_DIR_ABSOLUTE_PATH)[1]}` +
              `/validators/${kebabCase(interfaceName)}-is-invalid"

export function construct()
{
  return function (data: ${interfaceName}): void
  {
    const falseOrErrors = isInvalid(data)
    if (falseOrErrors)
    {
      throw new InvalidInputError(
        "The ${interfaceName} was invalid. Details:\\n" +
        \`  Errors: \${falseOrErrors}\\n\` +
        "  Full path: ${filename
          .split(ROOT_DIR_ABSOLUTE_PATH)[1]
          .replace(".ts", "")}\\n"
      )
    }
  }
}

export default construct()

export type Validate = ReturnType<typeof construct>
`,
          )
        }
        function cacheSource() {
          const hashedSchemaDef = md5(JSON.stringify(schemaDefs[interfaceName]))
          const cachedHashedSchemaDefPath = resolve(
            CACHE_PATH,
            `${filename
              .split(ROOT_DIR_ABSOLUTE_PATH)[1]
              .replace(new RegExp(sep, "g"), "_")}_${interfaceName}`,
          )
          mkdirpSync(CACHE_PATH)
          writeFileSync(cachedHashedSchemaDefPath, hashedSchemaDef)
        }
        // function schemaDefHasNotChangedSinceLastBuild() {
        //   const hashedSchemaDef = md5(JSON.stringify(schemaDefs[interfaceName]))
        //   const cachedHashedSchemaDefPath = resolve(
        //     CACHE_PATH,
        //     `${filename
        //       .split(ROOT_DIR_ABSOLUTE_PATH)[1]
        //       .replace(new RegExp(sep, "g"), "_")}_${interfaceName}`,
        //   )
        //   let cachedHashedSchemaDef: string | undefined
        //   try {
        //     cachedHashedSchemaDef = readFileSync(
        //       cachedHashedSchemaDefPath,
        //     ).toString("utf-8")
        //   } catch {}
        //   return hashedSchemaDef === cachedHashedSchemaDef
        // }
      } catch (error) {
        if (error instanceof schemaGenerator.NoRootTypeError) {
          warn(error.message)
          warn(
            "This is likely due to a bug that causes generic interfaces to be skipped.",
          )
        } else throw error
      }
    })
  }
}
