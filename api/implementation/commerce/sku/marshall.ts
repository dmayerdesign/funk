import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import marshallImpl from "@funk/plugins/persistence/actions/marshall"

export function construct(marshall = marshallImpl)
{
  return function(sku: Sku): MarshalledSku
  {
    return marshall<MarshalledSku, Sku>(sku, [
      "attributeValues",
      "taxonomyTerms",
      "imageGroups",
    ])
  }
}

export default construct()

export type Marshall = ReturnType<typeof construct>
