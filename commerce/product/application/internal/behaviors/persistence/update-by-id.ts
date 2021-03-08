import marshallImpl, {
  Marshall,
} from "@funk/commerce/product/application/internal/behaviors/persistence/marshall"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import genericUpdateById from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  updateById: typeof genericUpdateById,
  marshall: Marshall,
) {
  return async function (
    documentPath: string,
    documentData: Partial<Product>,
  ): Promise<void> {
    await updateById(PRODUCTS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(genericUpdateById, marshallImpl)
