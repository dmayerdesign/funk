import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { UserContent } from "@funk/identity/model/user-content"
import setByIdImpl, {
  SetById,
} from "@funk/identity/user-content/application/internal/behaviors/persistence/set-by-id"

export function construct(setById: SetById) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      const newUserContent: UserContent = {
        id: user.uid,
      }
      await setById(newUserContent.id, newUserContent)
    }
  }
}

export default construct(setByIdImpl)

export type CreateUserContentForNewUser = ReturnType<typeof construct>
