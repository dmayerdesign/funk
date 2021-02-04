import { Sku } from "@funk/commerce/sku/model/sku"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export interface Wishlist extends DatabaseDocument {
  userId: string
  name: string
  isDefault: boolean
  /** @required */
  skus?: Sku[]
}
