import * as firebaseTesting from "@firebase/testing"
import { mkdirpSync, writeFileSync } from "fs-extra"
import { firestoreExport } from "node-firestore-import-export"
import { resolve } from "path"
import { CLOUD_PROJECT_ID } from "../../configuration/local"

main()

async function main()
{
  try
  {
    await exportAllData(
      resolve(__dirname, "../../.funk/build-pipeline-output/export")
    )
  }
  catch (error)
  {
    console.error("Export failed. Details:")
    console.error(error)
    process.exit(1)
  }
}

async function exportAllData(pathToExportDir: string)
{
  const app = firebaseTesting.initializeAdminApp({ projectId: CLOUD_PROJECT_ID })
  ;(app.firestore() as unknown as FirebaseFirestore.Firestore)
    .listCollections().then((collectionRefs) =>
    {
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
        })
    })
  console.log("Export completed!")
}
