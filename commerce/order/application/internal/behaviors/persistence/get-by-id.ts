import populateImpl, {
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import genericGetById, {
  GetById as GenericGetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<Order | undefined> {
    const marshalledOrder = await getById<Order>(ORDERS, documentPath)
    return await populate(marshalledOrder)
  }
}

export type GetById = ReturnType<typeof construct>

export default construct(genericGetById, populateImpl)
