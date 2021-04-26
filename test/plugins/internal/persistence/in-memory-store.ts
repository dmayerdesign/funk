import { CONTENTS } from "@funk/admin/content/model/content"
import { ORDERS } from "@funk/commerce/order/model/order"
import { PRODUCTS } from "@funk/commerce/product/model/product"
import { USER_CONTENTS } from "@funk/identity/model/user-content"
import { PERSONS } from "@funk/identity/person/model/person"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import { TAXONOMIES } from "@funk/taxonomy/model/taxonomy"
import { TAXONOMY_TERMS } from "@funk/taxonomy/model/taxonomy-term"
import commerceOrders from "../../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../../build-pipeline/data/development-data/contents.json"
import identityPersons from "../../../../build-pipeline/data/development-data/identity.persons.json"
import identityUserContents from "../../../../build-pipeline/data/development-data/identity.user-contents.json"
import organizations from "../../../../build-pipeline/data/development-data/organizations.json"
import taxonomies from "../../../../build-pipeline/data/development-data/taxonomies.json"
import taxonomyTerms from "../../../../build-pipeline/data/development-data/taxonomy-terms.json"

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
