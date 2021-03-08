import namePattern from "@funk/helpers/name-pattern"
import { createFakePerson } from "@funk/identity/model/stubs"
import { Person } from "@funk/identity/person/model/person"
import { DefineStepFunction } from "jest-cucumber"

export async function createTestUser(
  displayName?: string,
): Promise<{ person: Person }> {
  const person = createFakePerson({ id: "test-user-basic", displayName })
  return { person }
}

export async function givenAUser(given: DefineStepFunction) {
  given(new RegExp(`a user named ${namePattern}`), (displayName: string) => {
    createTestUser(displayName)
  })
}
