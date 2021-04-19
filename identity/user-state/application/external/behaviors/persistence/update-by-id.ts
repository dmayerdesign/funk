import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Marshall } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(updateById: GenericUpdateById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: Partial<UserState>,
  ): Promise<void> {
    await updateById(USER_STATES, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>
