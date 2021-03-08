import marshallImpl from "@funk/commerce/product/application/internal/behaviors/persistence/marshall"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Product,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(PRODUCTS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
