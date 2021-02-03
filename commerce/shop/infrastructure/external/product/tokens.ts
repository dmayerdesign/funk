import { InjectionToken } from "@angular/core"
import { ListPublished } from "@funk/commerce/product/infrastructure/external/cloud-functions/list-published"

export const LIST_PUBLISHED = new InjectionToken<ListPublished>(
  "LIST_PUBLISHED",
)
