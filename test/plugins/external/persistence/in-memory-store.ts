import { CONTENTS } from "@funk/admin/content/model/content"
import { ORDERS } from "@funk/commerce/order/model/order"
import { PRODUCTS } from "@funk/commerce/product/model/product"
import { USER_CONTENTS } from "@funk/identity/model/user-content"
import { PERSONS } from "@funk/identity/person/model/person"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import { BehaviorSubject } from "rxjs"
import commerceOrders from "../../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../../build-pipeline/data/development-data/contents.json"
import identityPersons from "../../../../build-pipeline/data/development-data/identity.persons.json"
import identityUserContents from "../../../../build-pipeline/data/development-data/identity.user-contents.json"
import organizations from "../../../../build-pipeline/data/development-data/organizations.json"

let store: Record<string, Record<string, any>>
let store$: BehaviorSubject<Record<string, Record<string, any>>>

export async function initializeStore(): Promise<void> {
  store = {
    [ORGANIZATIONS]: organizations,
    [ORDERS]: commerceOrders,
    [PRODUCTS]: commerceProducts,
    [CONTENTS]: contents,
    [PERSONS]: identityPersons,
    [USER_CONTENTS]: identityUserContents,
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
