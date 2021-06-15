import { Content } from "@funk/content/model/content"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<Content>) {
  return async function (
    content: Marshalled<Content> | undefined,
  ): Promise<Content | undefined> {
    return content as Content
  }
}

export type Populate = ReturnType<typeof construct>
