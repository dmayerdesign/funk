import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"
import marshall from "@funk/plugins/persistence/actions/marshall"

export default function(product: Product): MarshalledProduct
{
  return marshall<MarshalledProduct, Product>(product, [
    "brand",
    "taxonomyTerms",
    "reviews",
  ])
}
