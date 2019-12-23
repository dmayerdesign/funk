const { assertFails, assertSucceeds } = require('@firebase/testing')
const { testUserUid, forbiddenUserUid, testFirestoreRules, it } = require('./test/test.helpers')
const USER_CONFIGS = 'identity.user-configs'

testFirestoreRules(
  it('should not allow a regular user to see another user config', async (app) => {
    return assertFails(app.firestore().collection(USER_CONFIGS).doc(forbiddenUserUid).get())
  }),
  
  it('should allow a regular user to see their own user config', async (app) => {
    return assertSucceeds(app.firestore().collection(USER_CONFIGS).doc(testUserUid).get())
  })
)
