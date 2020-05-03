#!/usr/bin/env node
const { readFileSync } = require('fs-extra')
const { resolve } = require('path')
const program = require('commander')
const firebase = require('firebase-admin');
const { firestoreImport } = require('node-firestore-import-export');
const { configToJson } = require('../../config/helpers/config-to-json')

program.option('-c, --configuration <configuration>',
  'e.g. production')
program.option('--collection <collection>',
  'Path relative to project root of the json file to import')
program.parse(process.argv)

// Translate `config.*.ts` to JSON.
const { configuration, collection } = program.opts()
const configJson = configToJson(configuration || 'development')
const importFileJson = JSON.parse(
  readFileSync(resolve(__dirname, `./development-data/${collection}.json`))
    .toString('utf8'))

// Set the service account data as a config variable.
const { PATH_TO_SERVICE_ACCOUNT_JSON } = configJson
const serviceAccountJson = require(PATH_TO_SERVICE_ACCOUNT_JSON)

firebase.initializeApp(serviceAccountJson);

const collectionRef = firebase.firestore().collection(collection)
firestoreImport(importFileJson, collectionRef)
  .then(() => console.log('Import completed!'))
  .catch((error) => console.error(`Import failed.\n\n${error}`))
