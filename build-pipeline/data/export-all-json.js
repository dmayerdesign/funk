#!/usr/bin/env node
const program = require('commander')
const firebase = require('firebase-admin')
const { mkdirpSync, writeFileSync } = require('fs-extra')
const inquirer = require('inquirer')
const { firestoreExport } = require('node-firestore-import-export')
const { resolve } = require('path')
const { configToJson } = require('../../config/helpers/config-to-json')

program.option('-c, --configuration <configuration>', 'e.g. production')
program.parse(process.argv)
main(program.opts())

async function main(options)
{
  try {
    // Translate `config.*.ts` to JSON.
    const { configuration } = options
    const configJson = configToJson(configuration)

    if (configuration === 'production')
    {
      const { productionExportOk } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'productionExportOk',
          message: `You are about to export all production data. Are you sure?`,
          default: false,
        }
      ])
      if (!productionExportOk) return
    }

    await exportAllData(
      resolve(__dirname, '../../.funk/build-pipeline-output/export'),
      configJson,
    )
  }
  catch (error)
  {
    console.error('Export failed. Details:')
    console.error(error)
    process.exit(1)
  }
}

async function exportAllData(pathToExportDir, configJson)
{
  // Set the service account data as a config variable.
  const { PATH_TO_SERVICE_ACCOUNT_JSON } = configJson
  const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON)

  firebase.initializeApp(serviceAccountJson)

  firebase.firestore().listCollections().then((collectionRefs) =>
  {
    Promise.all(collectionRefs
      .map((collectionRef) => firestoreExport(collectionRef)
        .then((data) => ({ [collectionRef.id]: data }))))
      .then((listOfPartials) => listOfPartials
        .reduce((allJson, partial) => ({ ...allJson, ...partial }), {}))
      .then((data) =>
      {
        const pathToExport = resolve(pathToExportDir,
          `all-data-${new Date().toISOString().replace(/\W+/g, '-')}.json`)
        mkdirpSync(pathToExportDir)
        writeFileSync(pathToExport, JSON.stringify(data, null, 2) + '\n', { encoding: 'utf8' })
      })
  })
}