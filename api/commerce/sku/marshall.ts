import marshallImpl from "@funk/api/plugins/persistence/behaviors/marshall"
import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"

export function construct(marshall: typeof marshallImpl) {
  return function (sku: Sku): MarshalledSku {
    return marshall<MarshalledSku, Sku>(sku, [
      "attributeValues",
      "taxonomyTerms",
      "imageGroups",
    ])
  }
}

export default construct(marshallImpl)

export type Marshall = ReturnType<typeof construct>
