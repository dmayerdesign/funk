import { ImageGroup } from "@funk/content/image-group/model/image-group"
import { merge } from "lodash"

export function createFakeImageGroup(
  customProps: Partial<ImageGroup> = {},
  identifier = "1",
): ImageGroup {
  return merge<ImageGroup, Partial<ImageGroup>>(
    {
      id: "fake image group id " + identifier,
      thumbnailSize: 1,
      largeSize: 1,
      originalSize: 1,
      images: {
        ["fake image id " + identifier + " 1"]: {
          url: "fake image url " + identifier + " 1",
        },
      },
    },
    customProps,
  )
}
