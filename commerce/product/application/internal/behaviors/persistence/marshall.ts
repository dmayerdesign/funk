import { Product } from "@funk/commerce/product/model/product"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (product: Partial<Product>): Marshalled<Product> {
    return marshall(product, [
      "attributeValues",
      "taxonomyTerms",
      "reviews",
      "brand",
    ])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
