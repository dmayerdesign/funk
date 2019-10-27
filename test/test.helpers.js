const { apps, initializeAdminApp, initializeTestApp, loadFirestoreRules } = require('@firebase/testing')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const chalk = require('chalk')
const USER_CONFIGS = 'user-configs'

/*
interface TestResultTotals {
  successCount: number
  failureCount: number
}

interface TestResult {
  assertion: string
  passed: boolean
}
*/

module.exports.projectId = 'my-test-project'
module.exports.testUserUid = 'tester'
module.exports.testOwnerUid = 'owner'
module.exports.testUserEmail = 'tester@example.com'
module.exports.forbiddenUserUid = 'forbidden'

// Set up.
const results/*: TestResult[]*/ = []
const defaultApp = initializeTestApp({
  projectId: module.exports.projectId,
  auth: {
    uid: module.exports.testUserUid,
    email: module.exports.testUserEmail
  }
})
const adminApp = initializeAdminApp({ projectId: module.exports.projectId })

module.exports.it = async function(assertion/*: string*/, fn/*: () => Promise<void>*/)/*: Promise<void>*/ {
  try {
    await fn(defaultApp, adminApp)
    results.push({ assertion, passed: true })
    console.log(chalk.green(`  ✓ ${assertion} SUCCEEDED`))
  }
  catch (error) {
    console.error(error)
    results.push({ assertion, passed: false })
    console.log(chalk.red(`  ✗ ${assertion} FAILED`))
  }
}

module.exports.describe = async function(name/*: string*/, cb/*: () => any*/)/*: void*/ {
  console.log(name)
  return cb()
}

module.exports.testFirestoreRules = function(...tests)/*: Promise<void>*/ {
  return module.exports.describe('Firestore', async () => {
    // Set up.
    await loadFirestoreRules({
      projectId: module.exports.projectId,
      rules: readFileSync(resolve(__dirname, '../firestore.rules'), 'utf-8'),
    })
    await adminApp.firestore().collection(USER_CONFIGS).doc(module.exports.forbiddenUserUid).set({
      id: module.exports.forbiddenUserUid,
      displayName: 'Another User',
      email: 'anotheruser@example.com',
      role: 'PUBLIC'
    })
    await adminApp.firestore().collection(USER_CONFIGS).doc(module.exports.testOwnerUid).set({
      id: module.exports.testOwnerUid,
      displayName: 'Owner',
      email: 'owner@example.com',
      role: 'OWNER'
    })
    await adminApp.firestore().collection(USER_CONFIGS).doc(module.exports.testUserUid).set({
      id: module.exports.testUserUid,
      displayName: 'Test User',
      email: 'testuser@example.com',
      role: 'PUBLIC'
    })

    // Test.
    await Promise.all(tests)

    // Tear down.
    await Promise.all(apps().map(app => app.delete()))
    const totals = results.reduce/*<TestResultTotals>*/((acc, result) => {
      const successCount = result.passed ? acc.successCount + 1 : acc.successCount
      const failureCount = !result.passed ? acc.failureCount + 1 : acc.failureCount
      return { successCount, failureCount }
    }, { successCount: 0, failureCount: 0 })

    console.log(chalk.green(`Passed: ${totals.successCount}`))
    if (totals.failureCount > 0) {
      console.log(chalk.red(`Failed: ${totals.failureCount}`))
    } else {
      console.log(chalk.hex('#999999')('Failed: 0'))
    }

    if (totals.failureCount > 0) throw new Error('One or more tests failed.')
    else return
  })
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
