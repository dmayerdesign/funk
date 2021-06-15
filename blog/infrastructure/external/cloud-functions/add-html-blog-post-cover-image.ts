import { ImageGroup } from "@funk/content/image-group/model/image-group"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

export type PayloadType = {
  contentId: PrimaryKey
  images: ImageGroup["images"]
}
/** The cover image group. */
export type ResolvedValueType = ImageGroup
export const functionName = "contentAddHtmlBlogPostCoverImage"
export type AddHtmlBlogPostCoverImage = ReturnType<typeof construct>

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}
