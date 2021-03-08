import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import marshallImpl from "@funk/identity/user-state/application/internal/behaviors/persistence/marshall"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: UserState,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(USER_STATES, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
