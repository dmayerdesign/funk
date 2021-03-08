import marshallImpl from "@funk/commerce/order/application/internal/behaviors/persistence/marshall"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Order,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(ORDERS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
