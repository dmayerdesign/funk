import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Marshall } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import { SetById as GenericSetById } from "@funk/persistence/application/external/behaviors/set-by-id"

export function construct(setById: GenericSetById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: UserState,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(USER_STATES, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>
