import populateImpl, {
  Populate,
} from "@funk/commerce/product/application/internal/behaviors/persistence/populate"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import genericGetById, {
  GetById as GenericGetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<Product | undefined> {
    const marshalledProduct = await getById<Product>(PRODUCTS, documentPath)
    return await populate(marshalledProduct)
  }
}

export type GetById = ReturnType<typeof construct>

export default construct(genericGetById, populateImpl)
