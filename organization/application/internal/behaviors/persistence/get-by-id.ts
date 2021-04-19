import populateImpl, {
  Populate,
} from "@funk/organization/application/internal/behaviors/persistence/populate"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import genericGetById, {
  GetById as GenericGetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (
    documentPath: string,
  ): Promise<Organization | undefined> {
    const marshalledOrganization = await getById<Organization>(
      ORGANIZATIONS,
      documentPath,
    )
    return await populate(marshalledOrganization)
  }
}

export type GetById = ReturnType<typeof construct>

export default construct(genericGetById, populateImpl)
