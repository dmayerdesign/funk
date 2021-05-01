import { Marshall } from "@funk/admin/content/application/external/behaviors/persistence/marshall"
import { Content, CONTENTS } from "@funk/admin/content/model/content"
import { SetById as GenericSetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { DbDocumentInput } from "@funk/persistence/model/database-document"

export function construct(setById: GenericSetById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: DbDocumentInput<Content>,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(
      CONTENTS,
      documentPath,
      marshall(documentData as Partial<Content>),
      options,
    )
  }
}

export type SetById = ReturnType<typeof construct>
