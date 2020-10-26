import {
  initializeAdminApp,
  initializeTestApp
} from "@firebase/rules-unit-testing"
import type { app } from "firebase"

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
  })
export const createAdminApp = () =>
  initializeAdminApp({ projectId: projectId }) as app.App
