import populateImpl, {
  Populate,
} from "@funk/organization/application/internal/behaviors/persistence/populate"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import genericList, {
  List as GenericList,
} from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"

export function construct(list: GenericList, populate: Populate) {
  return async function ({
    pagination,
    conditions,
  }: {
    pagination: Pagination<Organization> | VirtualPagination
    conditions: Condition<Organization>[]
  }): Promise<Organization[]> {
    const marshalledOrganizations = await list<Organization>({
      collection: ORGANIZATIONS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledOrganizations.map(
        (marshalledOrganization) =>
          populate(marshalledOrganization) as Promise<Organization>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
