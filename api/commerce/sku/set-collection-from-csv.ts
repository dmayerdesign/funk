import { ImportedSku } from "@funk/api/commerce/sku/_imported-sku"
import mapImportedSkuToSku from "@funk/api/commerce/sku/_map-imported-sku-to-sku"
import setManyImpl from "@funk/api/plugins/persistence/behaviors/set-many"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import marshalledSkuIsInvalid from "@funk/model/commerce/sku/validators/marshalled-sku-is-invalid"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import csvToJson from "csvtojson"
import { Dictionary, values } from "lodash"

export function construct(
  setMany: typeof setManyImpl
)
{
  return async function(csvData: string): Promise<void>
  {
    const rowsJson: ImportedSku[] = await csvToJson().fromString(csvData)

    if (rowsJson.length === 0) return

    const jsonCollectionData: Dictionary<MarshalledSku> = rowsJson.reduce(
      (collectionData, jsonRow) =>
      {
        collectionData[jsonRow["SKU"]] = mapImportedSkuToSku(jsonRow)
        return collectionData
      },
      {} as Dictionary<MarshalledSku>)

    throwIfCollectionDataContainsInvalidSku(jsonCollectionData)

    await setMany({
      [SKUS]: jsonCollectionData,
    })
  }
}

export default construct(setManyImpl)

export type SetCollectionFromCsv = ReturnType<typeof construct>

function throwIfCollectionDataContainsInvalidSku(collectionData: Dictionary<MarshalledSku>): void
{
  values(collectionData).forEach((sku) =>
  {
    if (marshalledSkuIsInvalid(sku))
    {
      throw new InvalidInputError(
        `Encountered an invalid SKU, aborting the import. Invalid SKU: ${JSON.stringify(sku)}`
      )
    }
  })
}
