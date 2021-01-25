import { ImportedSku } from "@funk/commerce/sku/application/internal/behaviors/_imported-sku"
import mapImportedSkuToSku from "@funk/commerce/sku/application/internal/behaviors/_map-imported-sku-to-sku"
import { MarshalledSku, SKUS } from "@funk/commerce/sku/domain/sku"
import marshalledSkuIsInvalid from "@funk/commerce/sku/domain/validators/marshalled-sku-is-invalid"
import { InvalidInputError } from "@funk/error/domain/invalid-input-error"
import setManyImpl from "@funk/persistence/application/internal/behaviors/set-many"
import csvToJson from "csvtojson"
import { Dictionary, values } from "lodash"

export function construct(setMany: typeof setManyImpl) {
  return async function (csvData: string): Promise<void> {
    const rowsJson: ImportedSku[] = await csvToJson().fromString(csvData)

    if (rowsJson.length === 0) return

    const jsonCollectionData: Dictionary<MarshalledSku> = rowsJson.reduce(
      (collectionData, jsonRow) => {
        collectionData[jsonRow["SKU"]] = mapImportedSkuToSku(jsonRow)
        return collectionData
      },
      {} as Dictionary<MarshalledSku>,
    )

    throwIfCollectionDataContainsInvalidSku(jsonCollectionData)

    await setMany({
      [SKUS]: jsonCollectionData,
    })
  }
}

export default construct(setManyImpl)

export type SetCollectionFromCsv = ReturnType<typeof construct>

function throwIfCollectionDataContainsInvalidSku(
  collectionData: Dictionary<MarshalledSku>,
): void {
  values(collectionData).forEach((sku) => {
    if (marshalledSkuIsInvalid(sku)) {
      throw new InvalidInputError(
        `Encountered an invalid SKU, aborting the import. Invalid SKU: ${JSON.stringify(
          sku,
        )}`,
      )
    }
  })
}
