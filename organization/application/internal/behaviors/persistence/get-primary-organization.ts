import populate from "@funk/organization/application/internal/behaviors/persistence/populate"
import {
  Organization,
  ORGANIZATIONS,
  PRIMARY_ORGANIZATION,
} from "@funk/organization/model/organization"
import genericGetById, {
  GetById as GenericGetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"

export function construct(getById: GenericGetById) {
  return async function (): Promise<Organization | undefined> {
    const marshalledOrganization = await getById<Organization>(
      ORGANIZATIONS,
      PRIMARY_ORGANIZATION,
    )
    return populate(marshalledOrganization)
  }
}

export type GetPrimaryOrganization = ReturnType<typeof construct>

export default construct(genericGetById)
