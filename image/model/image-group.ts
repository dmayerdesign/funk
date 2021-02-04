import { Image } from "@funk/image/model/image"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

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
