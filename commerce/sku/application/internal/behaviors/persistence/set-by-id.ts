import marshallImpl from "@funk/commerce/sku/application/internal/behaviors/persistence/marshall"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Sku,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(SKUS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
