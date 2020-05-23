import { ListFilter, ListFilterType } from
  '@funk/model/commerce/product/list-filter/list-filter'
import { MarshalledProduct } from '@funk/model/commerce/product/product'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'

export default function(listFilter: ListFilter):
  (Where<MarshalledProduct> | AbstractWhere)[]
{
  switch (listFilter.type)
  {
    case ListFilterType.ATTRIBUTE_VALUE:
      return [[ 'attributeValues', 'in', listFilter.attributeValueIds ]]
    case ListFilterType.TAXONOMY_TERM:
      return [[ 'taxonomyTerms', 'in', listFilter.taxonomyTermIds ]]
    case ListFilterType.SCALAR_PROPERTY:
      return [[ listFilter.key, 'in', listFilter.values ]]
    case ListFilterType.SCALAR_ATTRIBUTE:
      return [[ `attributeValues.${listFilter.attributeId}`, 'in', listFilter.values ]]
    case ListFilterType.RANGE_PROPERTY:
      return [
        [ listFilter.key, '>=', listFilter.range.min ],
        [ listFilter.key, '<', listFilter.range.max ],
      ]
    case ListFilterType.RANGE_ATTRIBUTE:
      return [
        [ `attributeValues.${listFilter.attributeId}`, '>=', listFilter.range.min ],
        [ `attributeValues.${listFilter.attributeId}`, '<', listFilter.range.max ],
      ]
  }
}
