import setManyImpl from "@funk/api/plugins/persistence/actions/set-many"
import { SKUS, Sku } from "@funk/model/commerce/sku/sku"
import skuIsInvalid from "@funk/model/commerce/sku/validators/sku-is-invalid"
import { values } from "lodash"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

export function construct(
  setMany = setManyImpl
)
{
  return async function(csvData: string): Promise<void>
  {
    console.log(csvData)
    const jsonCollectionData = {} as CollectionData
    throwIfCollectionDataContainsInvalidSku(jsonCollectionData)

    await setMany(SKUS, jsonCollectionData)
  }
}

export default construct()

export type SetCollectionFromCsv = ReturnType<typeof construct>

interface CollectionData {
  [id: string]: Sku
}

function throwIfCollectionDataContainsInvalidSku(collectionData: CollectionData): void
{
  values(collectionData).forEach((sku) =>
  {
    if (skuIsInvalid(sku))
    {
      throw new InvalidInputError(
        `Encountered an invalid SKU, aborting the import. Invalid SKU: ${JSON.stringify(sku)}`
      )
    }
  })
}
