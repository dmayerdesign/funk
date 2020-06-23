#!/usr/bin/env node
const { readFileSync } = require('fs-extra')
const { resolve } = require('path')
const program = require('commander')
const firebase = require('firebase-admin')
const inquirer = require('inquirer')
const { firestoreImport } = require('node-firestore-import-export')
const { configToJson } = require('../../config/helpers/config-to-json')

program.option('-c, --configuration <configuration>',
  'e.g. production')
program.option('--collection <collection>',
  'Path relative to project root of the json file to import')
program.parse(process.argv)
main(program.opts())

async function main(options)
{
  try
  {
    const { configuration, collection } = options
    const configJson = configToJson(configuration || 'development')
  
    if (configuration === 'production')
    {
      const { productionImportOk } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'productionImportOk',
          message: `You are about to import production data for collection \`${collection}\`. `
            + `Are you sure?`,
          default: false,
        }
      ])
      if (!productionImportOk) return
    }
  
    const importFileJson = JSON.parse(
      readFileSync(resolve(__dirname, `./development-data/${collection}.json`))
        .toString('utf8'))
  
    // Set the service account data as a config variable.
    const { PATH_TO_SERVICE_ACCOUNT_JSON } = configJson
    const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON)
  
    firebase.initializeApp(serviceAccountJson)
  
    const collectionRef = firebase.firestore().collection(collection)
    await firestoreImport(importFileJson, collectionRef)
    console.log('Import completed!')
  }
  catch (error)
  {
    console.error('Import failed. Details:')
    console.error(error)
    process.exit(1)
  }
}
