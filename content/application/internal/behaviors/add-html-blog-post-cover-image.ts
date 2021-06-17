import marshallContent from "@funk/content/application/internal/behaviors/persistence/marshall"
import marshallImageGroup from "@funk/content/image-group/application/internal/behaviors/persistence/marshall"
import {
  ImageGroup,
  IMAGE_GROUPS,
} from "@funk/content/image-group/model/image-group"
import { ContentHtmlBlogPost, CONTENTS } from "@funk/content/model/content"
import setManyImpl from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { v4 as uuid } from "uuid"

interface PayloadType {
  contentId: PrimaryKey
  images: ImageGroup["images"]
}

export function construct(setMany = setManyImpl) {
  return async function ({
    contentId,
    images,
  }: PayloadType): Promise<ImageGroup> {
    const sizesAscending = Object.keys(images)
      .map((intAsString) => parseInt(intAsString, 10))
      .sort()
    const imageGroupId = uuid()
    const imageGroup: ImageGroup = {
      id: imageGroupId,
      thumbnailSize: sizesAscending[0],
      largeSize: sizesAscending[1] ?? sizesAscending[0],
      originalSize: sizesAscending[2] ?? sizesAscending[1] ?? sizesAscending[0],
      images,
    }
    const contentUpdate: Partial<ContentHtmlBlogPost> = {
      coverImageGroup: imageGroup,
    }
    await setMany({
      [IMAGE_GROUPS]: {
        [imageGroupId]: marshallImageGroup(imageGroup),
      },
      [CONTENTS]: {
        [contentId]: marshallContent(contentUpdate),
      },
    })
    return imageGroup
  }
}

export type AddHtmlBlogPostCoverImage = ReturnType<typeof construct>

export default construct()
