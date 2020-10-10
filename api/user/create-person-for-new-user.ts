import { UserRecord } from "@funk/api/plugins/auth/user-record"
import setByIdImpl from "@funk/api/plugins/persistence/behaviors/set-by-id"
import { Person, PERSONS } from "@funk/model/identity/person"

export function construct(setById: typeof setByIdImpl) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      const newPerson: Person = {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
      }
      await setById(PERSONS, newPerson.id, newPerson)
    }
  }
}

export default construct(setByIdImpl)

export type CreatePersonForNewUser = ReturnType<typeof construct>
