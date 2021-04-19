import setManySkusImpl, {
  SetMany as SetManySkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import { ImportedSku } from "@funk/commerce/sku/application/internal/behaviors/_imported-sku"
import mapImportedSkuToSku from "@funk/commerce/sku/application/internal/behaviors/_map-imported-sku-to-sku"
import { Sku } from "@funk/commerce/sku/model/sku"
import skuIsInvalid from "@funk/commerce/sku/model/validators/sku-is-invalid"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import csvToJson from "csvtojson"
import { Dictionary, values } from "lodash"

export function construct(setManySkus: SetManySkus) {
  return async function (csvData: string): Promise<void> {
    const rowsJson: ImportedSku[] = await csvToJson().fromString(csvData)

    if (rowsJson.length === 0) return

    const jsonCollectionData: Dictionary<Marshalled<Sku>> = rowsJson.reduce(
      (collectionData, jsonRow) => {
        const skuId = jsonRow["SKU"]
        collectionData[skuId] = mapImportedSkuToSku(jsonRow)
        return collectionData
      },
      {} as Dictionary<Marshalled<Sku>>,
    )

    throwIfCollectionDataContainsInvalidSku(jsonCollectionData)

    await setManySkus(jsonCollectionData)
  }
}

export default construct(setManySkusImpl)

export type SetCollectionFromCsv = ReturnType<typeof construct>

function throwIfCollectionDataContainsInvalidSku(
  collectionData: Dictionary<Marshalled<Sku>>,
): void {
  values(collectionData).forEach((sku) => {
    if (skuIsInvalid(sku as Sku)) {
      throw new InvalidInputError(
        `Encountered an invalid SKU, aborting the import. Invalid SKU: ${JSON.stringify(
          sku,
        )}`,
      )
    }
  })
}
