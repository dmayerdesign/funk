import * as firebaseTesting from "@firebase/rules-unit-testing"
import { mkdirpSync, writeFileSync } from "fs-extra"
import { firestoreExport } from "node-firestore-import-export"
import { resolve } from "path"
import { CLOUD_PROJECT_ID } from "../../configuration/local"

if (require.main === module) {
  main()
    .catch(function (error) {
      console.error("Export failed. Details:")
      console.error(error)
      process.exit(1)
    })
    .then(function () {
      process.exit(0)
    })
}

export default async function main()
{
  await exportAllData(
    resolve(__dirname, "../../.funk/build-pipeline-output/export")
  )
}

async function exportAllData(pathToExportDir: string)
{
  const app = firebaseTesting.initializeAdminApp({ projectId: CLOUD_PROJECT_ID })
  await (app.firestore() as any)
    .listCollections().then((collectionRefs: FirebaseFirestore.CollectionReference[]) =>
      Promise.all(collectionRefs
        .map((collectionRef) => firestoreExport(collectionRef)
          .then((data) => ({ [collectionRef.id]: data }))))
        .then((listOfPartials) => listOfPartials
          .reduce((allJson, partial) => ({ ...allJson, ...partial }), {}))
        .then((data) =>
        {
          const pathToExport = resolve(pathToExportDir,
            `all-data-${new Date().toISOString().replace(/\W+/g, "-")}.json`)
          mkdirpSync(pathToExportDir)
          writeFileSync(pathToExport, JSON.stringify(data, null, 2) + "\n", { encoding: "utf8" })
        }))
  console.log("Export completed!")
}
