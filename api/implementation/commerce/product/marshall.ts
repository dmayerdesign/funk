import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"
import marshallImpl from "@funk/plugins/persistence/actions/marshall"

export function construct(marshall = marshallImpl)
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

export default construct()

export type Marshall = ReturnType<typeof construct>
