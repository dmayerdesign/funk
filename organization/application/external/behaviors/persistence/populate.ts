import { Organization } from "@funk/organization/model/organization"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<Organization>) {
  return async function (
    organization: Marshalled<Organization> | undefined,
  ): Promise<Organization | undefined> {
    return organization as Organization
  }
}

export type Populate = ReturnType<typeof construct>
