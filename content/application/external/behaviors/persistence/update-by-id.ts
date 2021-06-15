import { Marshall } from "@funk/content/application/external/behaviors/persistence/marshall"
import { Content, CONTENTS } from "@funk/content/model/content"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(updateById: GenericUpdateById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: Partial<Content>,
  ): Promise<void> {
    await updateById(CONTENTS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>
