// import { Component, OnInit } from "@angular/core"
// import { SKUS } from "@funk/commerce/sku/domain/sku"
// import { FUNCTIONS_BASE_URL } from "@funk/configuration"
// import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx"
// import { Platform } from "@ionic/angular"

// @Component({
//   selector: "import-skus",
//   template: `
//     <ion-button class="button" expand="full"

//       (click)="importSkusInput.click()">
//       <ion-icon class="icon" lazy="true" slot="start" name="image"></ion-icon>
//       <ion-label class="label" slot="end">Upload Image</ion-label>
//       <input #importSkusInput
//         id="import-skus-input"
//         type="file"
//         multiple
//         (change)="upload($event)"
//         [accept]="acceptContentTypes"
//         [style.visibility]="'hidden'"
//         [style.width]="0"
//       />
//     </ion-button>
//   `,
// })
// export class ImportSkusContainer implements OnInit
// {
//   public readonly acceptContentTypes = [
//     "application/csv",
//     "application/vnd.ms-excel",
//     "application/x-csv",
//     "text/comma-separated-values",
//     "text/csv",
//     "text/plain",
//     "text/x-comma-separated-values",
//     "text/x-csv",
//   ].join(",")
//   private _fileTransfer?: FileTransferObject

//   public constructor(
//     private _fileTransferFactory: FileTransfer,
//     private _platform: Platform
//   )
//   { }

//   public ngOnInit(): void
//   {
//     this._platform.ready().then(() =>
//     {
//       this._fileTransfer = this._fileTransferFactory.create()
//     })
//   }

//   public async upload(event: InputEvent & { target: { files: File[] } }): Promise<void>
//   {
//     const file = event.target?.files[0]
//     const reader = new FileReader()

//     reader.readAsDataURL(file)

//     reader.onload = async () =>
//     {
//       const dataUri = reader.result as string

//       console.log(dataUri)

//       // TODO: only if platform mobile.
//       // For web use `rxjs-uploader` with ionic button.
//       console.log(
//         await this._fileTransfer!.upload(
//           dataUri,
//           `${FUNCTIONS_BASE_URL}/commerceSkuImport`,
//           {
//             fileKey: SKUS,
//             fileName: `${SKUS}-import.csv`,
//             mimeType: this.acceptContentTypes,
//           }
//         )
//       )
//     }

//     reader.onerror = (error) =>
//     {
//       console.error(error)
//     }
//   }

//   public ngOnDestroy(): void
//   {
//     this._fileTransfer!.abort()
//   }
// }
