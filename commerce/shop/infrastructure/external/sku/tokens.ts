import { InjectionToken } from "@angular/core"
import { SkuImport } from "@funk/commerce/sku/infrastructure/external/cloud-functions/import"

export const SKU_IMPORT = new InjectionToken<SkuImport>("SKU_IMPORT")
