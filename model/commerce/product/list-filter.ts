export enum ListFilterType
{
  Property = 'property',
  AttributeValue = 'attribute-value',
  SimpleAttributeValue = 'simple-attribute-value',
  TaxonomyTerm = 'taxonomy-term',
}

export interface ListFilter
{
  type: ListFilterType
  key?: string
  values?: any[]
  range?: {
    min: number
    max: number
  }
}
