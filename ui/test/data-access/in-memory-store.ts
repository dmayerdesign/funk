import { ORDERS } from "@funk/model/commerce/order/order"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { PERSONS } from "@funk/model/identity/person"
import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { BehaviorSubject } from "rxjs"
import commerceOrders from "../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../build-pipeline/data/development-data/contents.json"
import identityPersons from "../../../build-pipeline/data/development-data/identity.persons.json"
import identityUserStates from "../../../build-pipeline/data/development-data/identity.user-states.json"

let store: Record<string, Record<string, any>>
let store$: BehaviorSubject<Record<string, Record<string, any>>>

export async function initializeStore(): Promise<void> {
  store = {
    [ORDERS]: commerceOrders,
    [PRODUCTS]: commerceProducts,
    [CONTENTS]: contents,
    [PERSONS]: identityPersons,
    [USER_STATES]: identityUserStates,
  }
  store$ = new BehaviorSubject(store)
  store$.subscribe()
}

export function getStore() {
  return store
}

export function getStore$() {
  return store$
}
