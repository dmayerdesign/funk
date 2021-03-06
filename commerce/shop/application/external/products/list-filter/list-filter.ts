import { Product } from "@funk/commerce/product/model/product"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export enum ListFilterType {
  SCALAR_PROPERTY = "SCALAR_PROPERTY",
  RANGE_PROPERTY = "RANGE_PROPERTY",
  SCALAR_ATTRIBUTE = "SCALAR_ATTRIBUTE",
  RANGE_ATTRIBUTE = "RANGE_ATTRIBUTE",
  ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE",
  TAXONOMY_TERM = "TAXONOMY_TERM",
}

interface ScalarPropertyListFilter<Key extends keyof Product = keyof Product> {
  type: ListFilterType.SCALAR_PROPERTY
  key: Key
  values: Product[Key][]
}

interface RangePropertyListFilter<Key extends keyof Product = keyof Product> {
  type: ListFilterType.RANGE_PROPERTY
  key: Key
  range: {
    min: Product[Key]
    max: Product[Key]
  }
}

interface ScalarAttributeListFilter {
  type: ListFilterType.SCALAR_ATTRIBUTE
  attributeId: PrimaryKey
  values: string[] | number[]
}

interface RangeAttributeListFilter {
  type: ListFilterType.RANGE_ATTRIBUTE
  attributeId: PrimaryKey
  range: {
    min: string | number
    max: string | number
  }
}

interface AttributeListFilter {
  type: ListFilterType.ATTRIBUTE_VALUE
  attributeValueIds: PrimaryKey[]
}

interface TaxonomyListFilter {
  type: ListFilterType.TAXONOMY_TERM
  taxonomyTermIds: PrimaryKey[]
}

export type ListFilter =
  | ScalarPropertyListFilter
  | RangePropertyListFilter
  | ScalarAttributeListFilter
  | RangeAttributeListFilter
  | AttributeListFilter
  | TaxonomyListFilter
