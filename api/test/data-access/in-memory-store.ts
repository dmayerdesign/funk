import { ORDERS } from "@funk/model/commerce/order/order"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"

const pathToCommerceOrders = "../../../build-pipeline/data/development-data/commerce.orders.json"
const pathToCommerceProducts =
  "../../../build-pipeline/data/development-data/commerce.products.json"
const pathToContents = "../../../build-pipeline/data/development-data/contents.json"
const pathToIdentityUserStates =
  "../../../build-pipeline/data/development-data/identity.user-states.json"

let store: Record<string, Record<string, any>>

export async function initializeStore(): Promise<void>
{
  store = {
    [ORDERS]: await import(pathToCommerceOrders),
    [PRODUCTS]: await import(pathToCommerceProducts),
    [CONTENTS]: await import(pathToContents),
    [USER_STATES]: await import(pathToIdentityUserStates),
  }
}

export function getStore(): typeof store
{
  return store
}
