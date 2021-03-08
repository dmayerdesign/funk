import { Product } from "@funk/commerce/product/model/product"
import {
  ListFilter,
  ListFilterType,
} from "@funk/commerce/shop/application/external/products/list-filter/list-filter"
import createDocPath from "@funk/helpers/create-doc-path"
import { Condition } from "@funk/persistence/application/external/condition"

export default function (listFilter: ListFilter): Condition<Product>[] {
  switch (listFilter.type) {
    case ListFilterType.ATTRIBUTE_VALUE:
      return [["attributeValues", "in", listFilter.attributeValueIds]]
    case ListFilterType.TAXONOMY_TERM:
      return [["taxonomyTerms", "in", listFilter.taxonomyTermIds]]
    case ListFilterType.SCALAR_PROPERTY:
      return [[listFilter.key, "in", listFilter.values]]
    case ListFilterType.SCALAR_ATTRIBUTE:
      let documentPath = createDocPath<Product>(
        "attributeValues",
        listFilter.attributeId,
      )
      return [[documentPath, "in", listFilter.values]]
    case ListFilterType.RANGE_PROPERTY:
      return [
        [listFilter.key, ">=", listFilter.range.min],
        [listFilter.key, "<", listFilter.range.max],
      ]
    case ListFilterType.RANGE_ATTRIBUTE:
      documentPath = createDocPath<Product>(
        "attributeValues",
        listFilter.attributeId,
      )
      return [
        [documentPath, ">=", listFilter.range.min],
        [documentPath, "<", listFilter.range.max],
      ]
  }
}
