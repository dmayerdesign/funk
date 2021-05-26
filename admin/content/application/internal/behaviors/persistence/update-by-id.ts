import marshallImpl from "@funk/admin/content/application/internal/behaviors/persistence/marshall"
import { Content, CONTENTS } from "@funk/admin/content/model/content"
import genericUpdateById from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  updateById: typeof genericUpdateById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Partial<Content>,
  ): Promise<void> {
    await updateById(CONTENTS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(genericUpdateById, marshallImpl)
