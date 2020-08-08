import {
  readFileSync,
  mkdirpSync,
  unlinkSync,
  writeFileSync,
  existsSync,
} from "fs-extra"
import { kebabCase } from "lodash"
import { resolve } from "path"
import recursiveReaddir from "recursive-readdir-sync"
import * as schemaGenerator from "ts-json-schema-generator"

export default function()
{
  const pathToModel = resolve(__dirname, "../../../model")
  const filenames = recursiveReaddir(pathToModel)
    .filter((filename) => !filename.match(/\/validators\//g))

  const modelEntrypointFilename = resolve(pathToModel, "validators/main.ts")
  mkdirpSync(resolve(pathToModel, "validators"))
  writeFileSync(
    modelEntrypointFilename,
    `/* eslint-disable max-len */
${
  filenames
    .filter((filename) => filename.endsWith(".ts"))
    .filter((filename) => !filename.includes(".spec."))
    .filter((filename) => !filename.includes("/validators/"))
    // Causing a bug for some reason:
    .filter((filename) => !filename.includes("get-price-after-order-discounts"))
    .map((filename) => `import "@funk/model/${filename.split("/model/")[1]}"`)
    .join("\n")
}\n`
  )

  const generator = schemaGenerator.createGenerator({
    path: modelEntrypointFilename,
    tsconfig: resolve(__dirname, "../../../tsconfig.schema.json"),
    type: "*",
  })

  for (const filename of filenames)
  {
    const modelDirname = filename.substring(0, filename.lastIndexOf("/"))
    const validatorsDirname = resolve(modelDirname, "validators")

    const fileString = readFileSync(filename).toString("utf-8")
    const interfaceNames = fileString.match(new RegExp("(?<=export(\\s)+interface(\\s)+)\\w+", "g"))

    interfaceNames?.forEach((interfaceName) =>
    {
      try
      {
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
        if (existsSync(schemaDefFilename)) unlinkSync(schemaDefFilename)
        if (existsSync(validator1Filename)) unlinkSync(validator1Filename)

        const schemaDef = schemaDefs[interfaceName]
        if (!schemaDef) return

        const schemaDefFile = JSON.stringify(schemaDef, null, 2) + "\n"
        const validator1File =
`/* eslint-disable max-len */
import { ${interfaceName} } from "@funk/model/${filename.split("/model/")[1]}"
import schema from "@funk/model/${schemaDefFilename.split("/model/")[1]}"

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
        const validator2File =
`/* eslint-disable max-len */
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { ${interfaceName} } from "@funk/model/${filename.split("/model/")[1]}"
import isInvalid from "@funk/model/${modelDirname.split("/model/")[1]}` +
  `/validators/${filename.split("/").pop()!.replace(".ts", "")}-is-invalid"

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
        "  Qualified name: ${filename.split("/model/")[1].replace(".ts", "")}\\n"
      )
    }
  }
}

export default construct()

export type Validate = ReturnType<typeof construct>
`
        mkdirpSync(validatorsDirname)
        console.log("Writing " + schemaDefFilename)
        writeFileSync(schemaDefFilename, schemaDefFile)
        console.log("Writing " + validator1Filename)
        writeFileSync(validator1Filename, validator1File)
        console.log("Writing " + validator2Filename)
        writeFileSync(validator2Filename, validator2File)
      }
      catch (error)
      {
        console.error(error)
      }
    })
  }
}
