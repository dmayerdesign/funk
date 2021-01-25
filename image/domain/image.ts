import { ImageResolution } from "@funk/image/domain/image-resolution"

export interface Image {
  url: string
  resolution?: ImageResolution
}
