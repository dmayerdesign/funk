import {
  assertFails,
  assertSucceeds,
  loadFirestoreRules,
} from "@firebase/rules-unit-testing"
import { UserRole } from "@funk/auth/model/user-role"
import {
  createAdminApp,
  createDefaultApp,
  forbiddenUserUid,
  projectId,
  testOwnerUid,
  testUserUid,
} from "@funk/helpers/test-helpers"
import { PERSONS } from "@funk/identity/person/model/person"
import firebase from "firebase"
import { readFileSync } from "fs"
import { resolve } from "path"

describe.skip("Firestore access control rules", () => {
  let adminApp: firebase.app.App
  let defaultApp: firebase.app.App

  beforeAll(async () => {
    adminApp = createAdminApp()
    defaultApp = createDefaultApp()

    await adminApp.firestore().collection(PERSONS).doc(forbiddenUserUid).set({
      id: forbiddenUserUid,
      displayName: "Another User",
      email: "anotheruser@example.com",
      role: UserRole.PUBLIC,
    })
    await adminApp.firestore().collection(PERSONS).doc(testOwnerUid).set({
      id: testOwnerUid,
      displayName: "Owner",
      email: "owner@example.com",
      role: UserRole.OWNER,
    })
    await adminApp.firestore().collection(PERSONS).doc(testUserUid).set({
      id: testUserUid,
      displayName: "Test User",
      email: "testuser@example.com",
      role: UserRole.PUBLIC,
    })
    await loadFirestoreRules({
      projectId: projectId,
      rules: readFileSync(resolve(__dirname, "../firestore.rules"), "utf-8"),
    })
  })

  it("should not allow a regular user to see another user config", () => {
    assertFails(
      defaultApp.firestore().collection(PERSONS).doc(forbiddenUserUid).get(),
    )
  })

  it("should allow a regular user to see their own user config", () => {
    assertSucceeds(
      defaultApp.firestore().collection(PERSONS).doc(testUserUid).get(),
    )
  })
})
