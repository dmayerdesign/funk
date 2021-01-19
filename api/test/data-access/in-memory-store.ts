import { ORDERS } from "@funk/model/commerce/order/order"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { CONTENTS } from "@funk/model/managed-content/managed-content"

const pathToCommerceOrders =
  "../../../build-pipeline/data/development-data/commerce.orders.json"
const pathToCommerceProducts =
  "../../../build-pipeline/data/development-data/commerce.products.json"
const pathToContents =
  "../../../build-pipeline/data/development-data/contents.json"

let store: Record<string, Record<string, any>>

export async function initializeStore(): Promise<void> {
  store = {
    [ORDERS]: await import(pathToCommerceOrders),
    [PRODUCTS]: await import(pathToCommerceProducts),
    [CONTENTS]: await import(pathToContents),
  }
}

export function getStore(): typeof store {
  return store
}
