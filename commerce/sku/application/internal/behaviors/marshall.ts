import { MarshalledSku, Sku } from "@funk/commerce/sku/domain/sku"
import marshallImpl from "@funk/persistence/application/internal/behaviors/marshall"

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
