// import * as firebaseTesting from "@firebase/testing"
// import chalk from "chalk"
// import program from "commander"
// import { readFileSync } from "fs-extra"
// import { firestoreImport } from "node-firestore-import-export"
// import { resolve } from "path"
// import { Configuration } from "../../configuration/model/configuration"
// import { CLOUD_PROJECT_ID } from "../../configuration/local"

// interface Options {
//   configuration: Configuration
//   collection: string
// }

// if (require.main === module) {
//   program.option("-c, --configuration <configuration>",
//     "e.g. production")
//   program.option("--collection <collection>",
//     "Path relative to project root of the json file to import",
//     collectCollectionNames,
//     [])
//   program.parse(process.argv)

//   main(program.opts() as Options)
//     .then(() => process.exit(0))
//     .catch((error) =>
//     {
//       console.error(error)
//       process.exit(1)
//     })
// }

// export default async function main(options: Options)
// {
//   const { collection: collections } = options

//   for (const collection of collections)
//   {
//     try
//     {
//       const importFileJson = JSON.parse(
//         readFileSync(resolve(__dirname, `./development-data/${collection}.json`))
//           .toString("utf8"))

//       const app = firebaseTesting.initializeAdminApp({ projectId: CLOUD_PROJECT_ID })
//       const collectionRef = app.firestore().collection(collection)
//       await firestoreImport(
//         importFileJson,
//         collectionRef as unknown as FirebaseFirestore.CollectionReference
//       )
//       console.log(`${chalk.green("Import succeeded for")} ${chalk.green.bold(collection)}`)
//     }
//     catch (error)
//     {
//       console.log(`${chalk.red("Import failed for")} ${chalk.red.bold(collection)}`)
//     }
//   }
// }

// function collectCollectionNames(value: string, acc: string[]): string[]
// {
//   return acc.concat([value])
// }
