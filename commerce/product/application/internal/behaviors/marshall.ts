import {
  MarshalledProduct,
  Product,
} from "@funk/commerce/product/model/product"
import marshallImpl from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof marshallImpl) {
  return function (product: Product): MarshalledProduct {
    return marshall<MarshalledProduct, Product>(product, [
      "brand",
      "taxonomyTerms",
      "reviews",
    ])
  }
}

export default construct(marshallImpl)

export type Marshall = ReturnType<typeof construct>
