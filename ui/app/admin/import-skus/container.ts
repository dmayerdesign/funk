import { Component } from "@angular/core"
// import { SKUS } from "@funk/model/commerce/sku/sku"
// import { FUNCTIONS_BASE_URL } from "@funk/config"
import { FileTransfer } from "@ionic-native/file-transfer/ngx"

@Component({
  selector: "import-skus",
  template: `
    <ion-button expand="full">
      <ion-icon lazy="true" slot="start" name="image"></ion-icon>
      <ion-label slot="end">Upload Image</ion-label>
      <input id="import-skus-input"
        type="file"
        multiple
        (change)="upload($event)"
        accept="text/csv">
    </ion-button>
  `,
})
export class ImportSkusContainer
{
  private _fileTransfer = this._fileTransferFactory.create()

  public constructor(
    private _fileTransferFactory: FileTransfer
  ) { }

  public async upload(event: InputEvent & { target: { files: File[] } }): Promise<void>
  {
    const file = event.target?.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () =>
    {
      console.log(reader.result)

      // console.log(
      //   await this._fileTransfer.upload(
      //     uri,
      //     `${FUNCTIONS_BASE_URL}/commerceSkuImport`,
      //     {
      //       fileKey: SKUS,
      //       fileName: "skus-import.csv",
      //       mimeType: "text/csv",
      //     }
      //   )
      // )
    }

    reader.onerror = (error) =>
    {
      console.error(error)
    }
  }

  public ngOnDestroy(): void
  {
    this._fileTransfer.abort()
  }
}
