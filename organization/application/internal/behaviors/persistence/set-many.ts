import marshallImpl from "@funk/organization/application/internal/behaviors/persistence/marshall"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericSetMany from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

interface Organizations {
  [documentPath: string]: Organization
}

interface MarshalledOrganizations {
  [documentPath: string]: Marshalled<Organization>
}

export function construct(
  setMany: typeof genericSetMany,
  marshall: typeof marshallImpl,
) {
  return async function (
    organizations: Organizations | MarshalledOrganizations,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const marshalledOrganizations: MarshalledOrganizations = Object.keys(
      organizations,
    )
      .map(
        (organizationId) =>
          [
            organizationId,
            marshall(organizations[organizationId] as Organization),
          ] as [PrimaryKey, Organization],
      )
      .reduce(
        (
          _marshalledOrganizations,
          [organizationId, marshalledOrganization],
        ) => ({
          ..._marshalledOrganizations,
          [organizationId]: marshalledOrganization,
        }),
        {} as MarshalledOrganizations,
      )
    await setMany(
      {
        [ORGANIZATIONS]: marshalledOrganizations,
      },
      options,
    )
  }
}

export type SetMany = ReturnType<typeof construct>

export default construct(genericSetMany, marshallImpl)
