import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import setByIdImpl, {
  SetById,
} from "@funk/identity/person/application/internal/behaviors/persistence/set-by-id"
import { Person } from "@funk/identity/person/model/person"

export function construct(setById: SetById) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      const newPerson: Person = {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
      }
      await setById(newPerson.id, newPerson)
    }
  }
}

export default construct(setByIdImpl)

export type CreatePersonForNewUser = ReturnType<typeof construct>
