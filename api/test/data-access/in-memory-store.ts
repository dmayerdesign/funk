import { ORDERS } from "@funk/model/commerce/order/order"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import commerceOrders from "../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../build-pipeline/data/development-data/contents.json"
import identityUserStates from "../../../build-pipeline/data/development-data/identity.user-states.json"

let store: Record<string, Record<string, any>>

export function initializeStore(): void
{
  store = {
    [ORDERS]: commerceOrders,
    [PRODUCTS]: commerceProducts,
    [CONTENTS]: contents,
    [USER_STATES]: identityUserStates,
  }
}

export function getStore(): typeof store
{
  return store
}
