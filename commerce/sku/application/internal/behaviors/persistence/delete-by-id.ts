import { SKUS } from "@funk/commerce/sku/model/sku"
import genericDeleteById, {
  DeleteById as GenericDeleteById,
} from "@funk/persistence/application/internal/behaviors/delete-by-id"

export function construct(deleteById: GenericDeleteById) {
  return async function (documentPath: string): Promise<void> {
    await deleteById(SKUS, documentPath)
  }
}

export type DeleteById = ReturnType<typeof construct>

export default construct(genericDeleteById)
