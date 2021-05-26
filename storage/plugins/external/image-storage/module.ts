import { NgModule } from "@angular/core"
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from "@angular/fire/storage"
import { construct as constructUploadImage } from "@funk/storage/plugins/external/image-storage/behaviors/upload-image"
import { UPLOAD_IMAGE } from "@funk/storage/plugins/external/image-storage/tokens"

@NgModule({
  imports: [AngularFireStorageModule],
  providers: [
    {
      provide: UPLOAD_IMAGE,
      useFactory: constructUploadImage,
      deps: [AngularFireStorage],
    },
  ],
})
export class ImageStorageModule {}
