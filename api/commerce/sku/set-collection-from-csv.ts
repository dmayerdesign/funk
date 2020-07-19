import setManyImpl from "@funk/api/plugins/persistence/actions/set-many"
import { SKUS } from "@funk/model/commerce/sku/sku"
import isValid from "@funk/model/commerce/sku/is-valid"

export function construct(
  setMany = setManyImpl
)
{
  return async function(csvData: string): Promise<void>
  {
    const jsonCollectionData = {}
    await setMany(SKUS, jsonCollectionData)
  }
}

export default construct()

export type SetCollectionFromCsv = ReturnType<typeof construct>
