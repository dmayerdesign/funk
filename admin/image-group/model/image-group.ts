import { Image } from "@funk/image/model/image"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export interface ImageGroup extends DatabaseDocument {
  /**
   * A number equal to the larger value (either `width` or `height`)
   * of the thumbnail image's `resolution`.
   */
  thumbnailSize: number
  /**
   * A number equal to the larger value (either `width` or `height`)
   * of the large image's `resolution`.
   */
  largeSize: number
  /**
   * A number equal to the larger value (either `width` or `height`)
   * of the full-size image's `resolution`.
   */
  originalSize: number
  images: {
    /**
     * These keys should be numbers equal to `ImageGroup.thumbnailSize`, `ImageGroup.largeSize`,
     * and `ImageGroup.originalSize`. Note that `originalSize` should generally not be used except
     * for administrative purposes.
     *
     * @example `const largeImage: Image = imageGroup.images[imageGroup.largeSize]`
     */
    [size: number]: Image
  }
}

export const IMAGE_GROUP = "admin.image-group"
