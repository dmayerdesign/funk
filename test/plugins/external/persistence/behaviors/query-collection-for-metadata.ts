import type { CollectionReference, Query } from "@angular/fire/firestore"
import { Customer } from "@funk/commerce/customer/domain/customer"
import { Cart, ORDERS } from "@funk/commerce/order/domain/order"
import createDocPath from "@funk/helpers/create-doc-path"
import { DbDocumentMetadata } from "@funk/persistence/domain/database-document"
import orders from "../../../../../build-pipeline/data/development-data/commerce.orders.json"

export function construct() {
  return async function (
    _collectionPath: string,
    _selector: (collectionReference: CollectionReference) => Query,
  ): Promise<DbDocumentMetadata[]> {
    switch (_collectionPath) {
      case ORDERS:
        let documentPath = "test-cart-basic"
        const fakeCollectionRef = {
          where(path: string, _cmp: string, value: any) {
            if (path === createDocPath<Cart, Customer>("customer", "userId")) {
              documentPath =
                Object.keys(orders).find(
                  (orderId) =>
                    orders[orderId as keyof typeof orders].customer.userId ===
                    value,
                ) ?? ""
            }
            return {
              where: fakeCollectionRef.where,
              limit: fakeCollectionRef.limit,
            }
          },
          limit: () => {},
        }
        _selector((fakeCollectionRef as unknown) as CollectionReference)
        return [
          {
            collectionPath: _collectionPath,
            documentPath: documentPath,
          },
        ]
      default:
        return [
          {
            collectionPath: _collectionPath,
            documentPath: "",
          },
        ]
    }
  }
}

export default construct()
