import marshallImpl from "@funk/commerce/sku/application/internal/behaviors/persistence/marshall"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericSetMany from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

interface Skus {
  [documentPath: string]: Sku
}

interface MarshalledSkus {
  [documentPath: string]: Marshalled<Sku>
}

export function construct(
  setMany: typeof genericSetMany,
  marshall: typeof marshallImpl,
) {
  return async function (
    skus: Skus | MarshalledSkus,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const marshalledSkus: MarshalledSkus = Object.keys(skus)
      .map(
        (skuId) => [skuId, marshall(skus[skuId] as Sku)] as [PrimaryKey, Sku],
      )
      .reduce(
        (_marshalledSkus, [skuId, marshalledSku]) => ({
          ..._marshalledSkus,
          [skuId]: marshalledSku,
        }),
        {} as MarshalledSkus,
      )
    await setMany(
      {
        [SKUS]: marshalledSkus,
      },
      options,
    )
  }
}

export type SetMany = ReturnType<typeof construct>

export default construct(genericSetMany, marshallImpl)
