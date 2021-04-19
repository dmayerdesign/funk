import populateImpl, {
  Populate,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/populate"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import genericGetById, {
  GetById as GenericGetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<Sku | undefined> {
    const marshalledSku = await getById<Sku>(SKUS, documentPath)
    return await populate(marshalledSku)
  }
}

export type GetById = ReturnType<typeof construct>

export default construct(genericGetById, populateImpl)
