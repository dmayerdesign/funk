import { Component, OnInit, Inject } from "@angular/core"
import { SKUS } from "@funk/model/commerce/sku/sku"
import { SKU_IMPORT } from "@funk/ui/app/shop/sku/tokens"
import { construct as constructSkuImport } from "@funk/ui/functions/commerce/sku/import"
import csvMimeTypes from "@funk/helpers/csv/csv-mime-types"

@Component({
  selector: "import-skus",
  template: `
    <ion-button expand="full"
      (click)="importSkusInput.click()">
      <ion-icon lazy="true" slot="start" name="image"></ion-icon>
      <ion-label slot="end">Upload Image</ion-label>
      <input #importSkusInput
        id="import-skus-input"
        type="file"
        (change)="upload($event.target.files)"
        [accept]="acceptContentTypes"
        [style.visibility]="'hidden'"
        [style.width]="0"
      />
    </ion-button>
  `,
})
export class ImportSkusContainer implements OnInit
{
  public readonly acceptContentTypes = csvMimeTypes.join(",")
  public readonly fileKey = SKUS

  public constructor(
    @Inject(SKU_IMPORT) private _skuImport: ReturnType<typeof constructSkuImport>
  )
  { }

  public ngOnInit(): void
  { }

  public async upload(fileList: FileList): Promise<void>
  {
    const file = fileList.item(0)
    const fileReader = new FileReader()
    fileReader.readAsText(file!)
    fileReader.addEventListener("loadend", async () =>
    {
      await this._skuImport(fileReader.result as string)
    })
  }

  public ngOnDestroy(): void
  { }
}
