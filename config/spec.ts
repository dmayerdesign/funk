import { assertFails, assertSucceeds, loadFirestoreRules } from "@firebase/testing"
import { UserRole } from "@funk/model/auth/user-role"
import { USER_CONFIGS } from "@funk/model/identity/user-config"
import { createAdminApp, createDefaultApp, forbiddenUserUid, projectId, testOwnerUid,
  testUserUid } from "@funk/test/test.helpers"
import { app } from "firebase"
import { readFileSync } from "fs"
import { resolve } from "path"

xdescribe("Firestore access control rules", () =>
{
  let adminApp: app.App
  let defaultApp: app.App

  beforeAll(async (done) =>
  {
    await onBefore()
    done()
  })

  it("should not allow a regular user to see another user config", () =>
  {
    assertFails(defaultApp.firestore().collection(USER_CONFIGS)
      .doc(forbiddenUserUid).get())
  })

  it("should allow a regular user to see their own user config", () =>
  {
    assertSucceeds(defaultApp.firestore().collection(USER_CONFIGS)
      .doc(testUserUid).get())
  })

  async function onBefore(): Promise<void>
  {
    adminApp = createAdminApp()
    defaultApp = createDefaultApp()

    await adminApp.firestore().collection(USER_CONFIGS).doc(forbiddenUserUid).set({
      id: forbiddenUserUid,
      displayName: "Another User",
      email: "anotheruser@example.com",
      role: UserRole.PUBLIC,
    })
    await adminApp.firestore().collection(USER_CONFIGS).doc(testOwnerUid).set({
      id: testOwnerUid,
      displayName: "Owner",
      email: "owner@example.com",
      role: UserRole.OWNER,
    })
    await adminApp.firestore().collection(USER_CONFIGS).doc(testUserUid).set({
      id: testUserUid,
      displayName: "Test User",
      email: "testuser@example.com",
      role: UserRole.PUBLIC,
    })
    await loadFirestoreRules({
      projectId: projectId,
      rules: readFileSync(resolve(__dirname, "../firestore.rules"), "utf-8"),
    })
  }
})
