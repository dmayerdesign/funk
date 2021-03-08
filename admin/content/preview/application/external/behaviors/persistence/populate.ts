import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<ContentPreview>) {
  return async function (
    contentPreview: Marshalled<ContentPreview> | undefined,
  ): Promise<ContentPreview> {
    return (contentPreview ?? {}) as ContentPreview
  }
}

export type Populate = ReturnType<typeof construct>
