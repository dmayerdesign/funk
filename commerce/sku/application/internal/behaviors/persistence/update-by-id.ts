import marshallImpl from "@funk/commerce/sku/application/internal/behaviors/persistence/marshall"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import genericUpdateById from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  updateById: typeof genericUpdateById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Sku,
  ): Promise<void> {
    await updateById(SKUS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(genericUpdateById, marshallImpl)
