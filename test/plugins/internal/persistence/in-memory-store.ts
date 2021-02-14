import { CONTENTS } from "@funk/admin/content/model/content"
import { ORDERS } from "@funk/commerce/order/model/order"
import { PRODUCTS } from "@funk/commerce/product/model/product"
import { PERSONS } from "@funk/identity/model/person"
import { USER_STATES } from "@funk/identity/model/user-state"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import commerceOrders from "../../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../../build-pipeline/data/development-data/contents.json"
import identityPersons from "../../../../build-pipeline/data/development-data/identity.persons.json"
import identityUserStates from "../../../../build-pipeline/data/development-data/identity.user-states.json"
import organizations from "../../../../build-pipeline/data/development-data/organizations.json"

let store: Record<string, Record<string, any>>

export async function initializeStore(): Promise<void> {
  store = {
    [ORGANIZATIONS]: { ...organizations },
    [ORDERS]: { ...commerceOrders },
    [PRODUCTS]: { ...commerceProducts },
    [CONTENTS]: { ...contents },
    [PERSONS]: { ...identityPersons },
    [USER_STATES]: { ...identityUserStates },
  }
}

export function getStore(): typeof store {
  return store
}
