import { Person } from "@funk/identity/model/person"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export const FAKE_USER_UID: PrimaryKey = "test-user-basic"
export const FAKE_ID_TOKEN: PrimaryKey = "test-token"

export const createFakePerson = ({
  id = FAKE_USER_UID,
  displayName = "Test",
  email = "test@test.com",
} = {}) => ({ id, displayName, email } as Person)
