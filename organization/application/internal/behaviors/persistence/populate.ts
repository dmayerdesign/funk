import { Organization } from "@funk/organization/model/organization"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof genericPopulate) {
  return function (
    organization: Marshalled<Organization> | undefined,
  ): Promise<Organization> {
    return populate<Organization>(organization, [])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
