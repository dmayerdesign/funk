import { CONTENTS } from "@funk/admin/content/model/content"
import commerceOrders from "@funk/build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "@funk/build-pipeline/data/development-data/commerce.products.json"
import contents from "@funk/build-pipeline/data/development-data/contents.json"
import identityPersons from "@funk/build-pipeline/data/development-data/identity.persons.json"
import identityUserContents from "@funk/build-pipeline/data/development-data/identity.user-contents.json"
import organizations from "@funk/build-pipeline/data/development-data/organizations.json"
import taxonomies from "@funk/build-pipeline/data/development-data/taxonomies.json"
import taxonomyTerms from "@funk/build-pipeline/data/development-data/taxonomy-terms.json"
import { ORDERS } from "@funk/commerce/order/model/order"
import { PRODUCTS } from "@funk/commerce/product/model/product"
import { USER_CONTENTS } from "@funk/identity/model/user-content"
import { PERSONS } from "@funk/identity/person/model/person"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import { TAXONOMIES } from "@funk/taxonomy/model/taxonomy"
import { TAXONOMY_TERMS } from "@funk/taxonomy/model/taxonomy-term"

let store: Record<string, Record<string, any>>

export async function initializeStore(): Promise<void> {
  store = {
    [ORGANIZATIONS]: { ...organizations },
    [ORDERS]: { ...commerceOrders },
    [PRODUCTS]: { ...commerceProducts },
    [CONTENTS]: { ...contents },
    [PERSONS]: { ...identityPersons },
    [USER_CONTENTS]: { ...identityUserContents },
    [TAXONOMIES]: { ...taxonomies },
    [TAXONOMY_TERMS]: { ...taxonomyTerms },
  }
}

export function getStore(): typeof store {
  return store
}

export function setStore(newStore: typeof store): void {
  store = newStore
}
