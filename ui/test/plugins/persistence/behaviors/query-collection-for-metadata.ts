import type { CollectionReference, Query } from "@angular/fire/firestore"
import createDocPath from "@funk/helpers/create-doc-path"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { Cart, ORDERS } from "@funk/model/commerce/order/order"
import { DbDocumentMetadata } from "@funk/model/data-access/database-document"
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
