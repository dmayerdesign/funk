import { CONTENTS } from "@funk/admin/domain/managed-content/managed-content"
import { ORDERS } from "@funk/commerce/order/domain/order"
import { PRODUCTS } from "@funk/commerce/product/domain/product"
import { PERSONS } from "@funk/identity/domain/person"
import { USER_STATES } from "@funk/identity/domain/user-state"
import { ORGANIZATIONS } from "@funk/organization/domain/organization"
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
