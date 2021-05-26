import { InjectionToken } from "@angular/core"
import { UploadImage } from "@funk/storage/plugins/external/image-storage/behaviors/upload-image"

export const UPLOAD_IMAGE = new InjectionToken<UploadImage>("UPLOAD_IMAGE")
