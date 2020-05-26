import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import marshall from "@funk/plugins/persistence/actions/marshall"

export default function(sku: Sku): MarshalledSku
{
  return marshall<MarshalledSku, Sku>(sku, [
    "attributeValues",
    "taxonomyTerms",
    "imageGroups",
  ])
}
