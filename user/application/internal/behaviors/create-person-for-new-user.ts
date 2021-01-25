import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { Person, PERSONS } from "@funk/identity/domain/person"
import setByIdImpl from "@funk/persistence/application/internal/behaviors/set-by-id"

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
