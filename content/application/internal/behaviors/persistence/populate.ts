import { Content } from "@funk/content/model/content"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof genericPopulate) {
  return function (content: Marshalled<Content> | undefined): Promise<Content> {
    return populate<Content>(content, [])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
