import { Sku } from "@funk/commerce/sku/domain/sku"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export interface Wishlist extends DatabaseDocument {
  userId: string
  name: string
  isDefault: boolean
  /** @required */
  skus?: Sku[]
}
