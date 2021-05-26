import marshallContent from "@funk/admin/content/application/internal/behaviors/persistence/marshall"
import {
  ContentHtmlBlogPost,
  CONTENTS,
} from "@funk/admin/content/model/content"
import marshallImageGroup from "@funk/admin/image-group/application/internal/behaviors/persistence/marshall"
import {
  ImageGroup,
  IMAGE_GROUP,
} from "@funk/admin/image-group/model/image-group"
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
      largeSize: sizesAscending[1],
      originalSize: sizesAscending[2],
      images,
    }
    const contentUpdate: Partial<ContentHtmlBlogPost> = {
      coverImageGroup: imageGroup,
    }
    await setMany({
      [IMAGE_GROUP]: {
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
