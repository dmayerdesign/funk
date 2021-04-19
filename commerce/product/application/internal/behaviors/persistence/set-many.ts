import marshallImpl from "@funk/commerce/product/application/internal/behaviors/persistence/marshall"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericSetMany from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

interface Products {
  [documentPath: string]: Product
}

interface MarshalledProducts {
  [documentPath: string]: Marshalled<Product>
}

export function construct(
  setMany: typeof genericSetMany,
  marshall: typeof marshallImpl,
) {
  return async function (
    products: Products | MarshalledProducts,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const marshalledProducts: MarshalledProducts = Object.keys(products)
      .map(
        (productId) =>
          [productId, marshall(products[productId] as Product)] as [
            PrimaryKey,
            Product,
          ],
      )
      .reduce(
        (_marshalledProducts, [productId, marshalledProduct]) => ({
          ..._marshalledProducts,
          [productId]: marshalledProduct,
        }),
        {} as MarshalledProducts,
      )
    await setMany(
      {
        [PRODUCTS]: marshalledProducts,
      },
      options,
    )
  }
}

export type SetMany = ReturnType<typeof construct>

export default construct(genericSetMany, marshallImpl)
