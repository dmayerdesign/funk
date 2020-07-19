// import * as schemaGenerator from "ts-json-schema-generator"
import recursiveReaddir from "recursive-readdir-sync"
import { resolve } from "path"
import { readFileSync, mkdirpSync } from "fs-extra"

const pathToModel = resolve(__dirname, "../../../model")

const filenames = recursiveReaddir(pathToModel)

// const config = {
//   path: resolve(pathToModel, "commerce/sku/sku.ts"),
//   tsconfig: resolve(__dirname, "../../../tsconfig.json"),
//   type: "*",
// }
// const generator = schemaGenerator.createGenerator(config)
// const schemaDefinitions = generator.createSchema(config.type).definitions!

for (const filename of filenames)
{
  const modelDirname = filename.substring(0, filename.lastIndexOf("/"))
  mkdirpSync(resolve(modelDirname, "validators"))
  const fileString = readFileSync(filename).toString("utf-8")

  const interfaceNames = fileString.match(new RegExp("(?<=interface(\\s)+)\\w+", "g")) // ?.shift()

  if (interfaceNames)
  {
    console.log(interfaceNames)
  }

  // writeFileSync(resolve(modelDirname, ))
}

// For each file,
// - create a folder next to it called `validators`
// - read the file and determine the names of any interfaces
// - for each interface name, search for a schema definition
// - and create a file next to the model file named like `{interface-name}-is-valid.ts`.
// export default function(data: Sku): boolean

