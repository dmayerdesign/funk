import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import marshallImpl from "@funk/identity/user-content/application/internal/behaviors/persistence/marshall"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: UserContent,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(USER_CONTENTS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
