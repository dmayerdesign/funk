import { ORDERS } from "@funk/commerce/order/model/order"
import genericDeleteById, {
  DeleteById as GenericDeleteById,
} from "@funk/persistence/application/internal/behaviors/delete-by-id"

export function construct(deleteById: GenericDeleteById) {
  return async function (documentPath: string): Promise<void> {
    await deleteById(ORDERS, documentPath)
  }
}

export type DeleteById = ReturnType<typeof construct>

export default construct(genericDeleteById)
