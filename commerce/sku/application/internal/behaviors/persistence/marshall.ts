import { Sku } from "@funk/commerce/sku/model/sku"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (sku: Partial<Sku>): Marshalled<Sku> {
    return marshall(sku, ["attributeValues", "taxonomyTerms", "imageGroups"])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
