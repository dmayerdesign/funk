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
  return async function <ContentType extends Content = Content>({
    pagination,
    conditions,
  }: {
    pagination: Pagination<ContentType> | VirtualPagination
    conditions: Condition<ContentType>[]
  }): Promise<ContentType[]> {
    const marshalledContents = await list<ContentType>({
      collection: CONTENTS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledContents.map(
        (marshalledContent) =>
          populate(marshalledContent) as Promise<ContentType>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
