import populateImpl, {
  Populate,
} from "@funk/admin/content/application/internal/behaviors/persistence/populate"
import { Content, CONTENTS } from "@funk/admin/content/model/content"
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
    pagination: Pagination<Content> | VirtualPagination
    conditions: Condition<Content>[]
  }): Promise<Content[]> {
    const marshalledContents = await list<Content>({
      collection: CONTENTS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledContents.map(
        (marshalledContent) => populate(marshalledContent) as Promise<Content>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
