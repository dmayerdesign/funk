import marshallImpl, {
  Marshall,
} from "@funk/commerce/order/application/internal/behaviors/persistence/marshall"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import genericUpdateById from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  updateById: typeof genericUpdateById,
  marshall: Marshall,
) {
  return async function (
    documentPath: string,
    documentData: Partial<Order>,
  ): Promise<void> {
    const marshalledData = marshall(documentData)
    await updateById(ORDERS, documentPath, marshalledData)
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(genericUpdateById, marshallImpl)
