import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Marshall } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { SetById as GenericSetById } from "@funk/persistence/application/external/behaviors/set-by-id"

export function construct(setById: GenericSetById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: UserContent,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(USER_CONTENTS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>
