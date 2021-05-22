import marshallImpl from "@funk/organization/application/internal/behaviors/persistence/marshall"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import genericUpdateById from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  updateById: typeof genericUpdateById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Partial<Organization>,
  ): Promise<void> {
    await updateById(ORGANIZATIONS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(genericUpdateById, marshallImpl)
