import marshallImpl from "@funk/admin/image-group/application/internal/behaviors/persistence/marshall"
import {
  ImageGroup,
  IMAGE_GROUP,
} from "@funk/admin/image-group/model/image-group"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Partial<ImageGroup>,
  ): Promise<void> {
    await setById(IMAGE_GROUP, documentPath, marshall(documentData))
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
