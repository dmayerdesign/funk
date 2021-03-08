import marshallImpl from "@funk/organization/application/internal/behaviors/persistence/marshall"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Organization,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(ORGANIZATIONS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
