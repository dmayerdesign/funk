import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { Image } from "@funk/model/image/image"

interface Images {
  /**
   * Each key should be a number equal to the larger value (either `width` or `height`)
   * of the image's `resolution`.
   */
  [size: number]: Image
}

export interface ImageGroup extends DatabaseDocument {
  thumbnailSize: number
  largeSize: number
  images: Images
}
