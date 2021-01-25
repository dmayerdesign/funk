const firebaseTesting = require("@firebase/testing")
const chalk = require("chalk")
const program = require("commander")
const { readFileSync } = require("fs-extra")
const { firestoreImport } = require("node-firestore-import-export")
const { resolve } = require("path")
const { CLOUD_PROJECT_ID } = require("../../configuration/local")

if (require.main === module) {
  program.option("-c, --configuration <configuration>",
    "e.g. production")
  program.option("--collection <collection>",
    "Path relative to project root of the json file to import",
    collectCollectionNames,
    [])
  program.parse(process.argv)

  main(program.opts())
    .then(() => process.exit(0))
    .catch((error) =>
    {
      console.error(error)
      process.exit(1)
    })
}

export default async function main(options)
{
  const { collection: collections } = options

  for (const collection of collections)
  {
    try
    {
      const importFileJson = JSON.parse(
        readFileSync(resolve(__dirname, `./development-data/${collection}.json`))
          .toString("utf8"))

      const app = firebaseTesting.initializeAdminApp({ projectId: CLOUD_PROJECT_ID })
      const collectionRef = app.firestore().collection(collection)
      await firestoreImport(
        importFileJson,
        collectionRef
      )
      console.log(`${chalk.green("Import succeeded for")} ${chalk.green.bold(collection)}`)
    }
    catch (error)
    {
      console.log(`${chalk.red("Import failed for")} ${chalk.red.bold(collection)}`)
    }
  }
}

function collectCollectionNames(value, acc)
{
  return acc.concat([value])
}
