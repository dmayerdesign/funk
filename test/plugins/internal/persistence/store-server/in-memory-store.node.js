import commerceOrders from "../../../../../build-pipeline/data/development-data/commerce.orders.json"
import commerceProducts from "../../../../../build-pipeline/data/development-data/commerce.products.json"
import contents from "../../../../../build-pipeline/data/development-data/contents.json"
import identityPersons from "../../../../../build-pipeline/data/development-data/identity.persons.json"
import identityUserContents from "../../../../../build-pipeline/data/development-data/identity.user-contents.json"
import organizations from "../../../../../build-pipeline/data/development-data/organizations.json"
import taxonomies from "../../../../../build-pipeline/data/development-data/taxonomies.json"
import taxonomyTerms from "../../../../../build-pipeline/data/development-data/taxonomy-terms.json"

const initialStore = {
  organizations: { ...organizations },
  "commerce.orders": { ...commerceOrders },
  "commerce.products": { ...commerceProducts },
  contents: { ...contents },
  "identity.persons": { ...identityPersons },
  "identity.user-contents": { ...identityUserContents },
  taxonomies: { ...taxonomies },
  "taxonomy-terms": { ...taxonomyTerms },
}
let store = initialStore

export async function initializeStore() {
  store = initialStore
}

export function getStore() {
  return store
}

export function setStore(newStore) {
  store = newStore
}
