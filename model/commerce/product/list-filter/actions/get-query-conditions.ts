import createDocPath from "@funk/helpers/create-doc-path"
import { ListFilter, ListFilterType } from
  "@funk/model/commerce/product/list-filter/list-filter"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Condition } from "@funk/plugins/persistence/condition"

export default function(listFilter: ListFilter):
Condition<MarshalledProduct>[]
{
  switch (listFilter.type)
  {
    case ListFilterType.ATTRIBUTE_VALUE:
      return [[ "attributeValues", "in", listFilter.attributeValueIds ]]
    case ListFilterType.TAXONOMY_TERM:
      return [[ "taxonomyTerms", "in", listFilter.taxonomyTermIds ]]
    case ListFilterType.SCALAR_PROPERTY:
      return [[ listFilter.key, "in", listFilter.values ]]
    case ListFilterType.SCALAR_ATTRIBUTE:
      let documentPath = createDocPath<MarshalledProduct>(
        "attributeValues", listFilter.attributeId)
      return [[ documentPath, "in", listFilter.values ]]
    case ListFilterType.RANGE_PROPERTY:
      return [
        [ listFilter.key, ">=", listFilter.range.min ],
        [ listFilter.key, "<", listFilter.range.max ],
      ]
    case ListFilterType.RANGE_ATTRIBUTE:
      documentPath = createDocPath<MarshalledProduct>(
        "attributeValues", listFilter.attributeId)
      return [
        [ documentPath, ">=", listFilter.range.min ],
        [ documentPath, "<", listFilter.range.max ],
      ]
  }
}
