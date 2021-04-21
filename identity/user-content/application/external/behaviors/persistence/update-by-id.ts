import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Marshall } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(updateById: GenericUpdateById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: Partial<UserContent>,
  ): Promise<void> {
    await updateById(USER_CONTENTS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>
