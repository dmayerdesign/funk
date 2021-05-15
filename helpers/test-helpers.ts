import {
  initializeAdminApp,
  initializeTestApp,
} from "@firebase/rules-unit-testing"
import type firebase from "firebase"

export const projectId = "my-test-project"
export const testUserUid = "tester"
export const testOwnerUid = "owner"
export const testUserEmail = "tester@example.com"
export const forbiddenUserUid = "forbidden"
export const createDefaultApp = () =>
  initializeTestApp({
    projectId: projectId,
    auth: {
      uid: testUserUid,
      email: testUserEmail,
    },
  }) as firebase.app.App
export const createAdminApp = () =>
  // Cast to `unknown` due to mismatch in type version of `ThenableReference` in `firebase`.
  (initializeAdminApp({ projectId: projectId }) as unknown) as firebase.app.App
