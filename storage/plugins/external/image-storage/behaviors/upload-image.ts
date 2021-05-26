import {
  AngularFireStorage,
  AngularFireStorageReference,
} from "@angular/fire/storage"
import { Image } from "@funk/image/model/image"

export function construct(storage: AngularFireStorage) {
  return async function (
    dataUriOrBlob: string | Blob,
    objectPath: string,
  ): Promise<Image> {
    let blob = dataUriOrBlob as Blob
    if (typeof dataUriOrBlob === "string") {
      // Uploading data URIs with FireStorage doesn't work for some reason.
      // Convert it to a blob for uploading.
      // See https://stackoverflow.com/questions/49721233/uploaded-image-base64-looks-corrupted-in-firebase-putstring-method.
      blob = await (await fetch(dataUriOrBlob)).blob()
    }
    const storageRef: AngularFireStorageReference = storage.ref(objectPath)
    const objectSnapshot = await storageRef.put(blob)
    const url = await objectSnapshot.ref.getDownloadURL()

    return {
      url,
    }
  }
}

export type UploadImage = ReturnType<typeof construct>
