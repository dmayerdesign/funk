import marshallImpl from "@funk/api/plugins/persistence/behaviors/marshall"
import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"

export function construct(marshall: typeof marshallImpl)
{
  return function(product: Product): MarshalledProduct
  {
    return marshall<MarshalledProduct, Product>(product, [
      "brand",
      "taxonomyTerms",
      "reviews",
    ])
  }
}

export default construct(marshallImpl)

export type Marshall = ReturnType<typeof construct>
