import { AttributeValue } from '../attribute-value/attribute-value'
import { ProductListFilterUiDisplayWhen } from '../product-list-filter-ui-display-when/product-list-filter-ui-display-when'
import { ProductListFilterType } from '../product/product-list-filter'
import { SimpleAttributeValue } from '../simple-attribute-value/simple-attribute-value'
import { TaxonomyTerm } from '../taxonomy-term/taxonomy-term'

export interface ProductListFilterUi {
    filterType: ProductListFilterType
    enabled: boolean
    displayAlways?: boolean
    displayWhen?: ProductListFilterUiDisplayWhen
    label?: string
    taxonomyTermOptions?: TaxonomyTerm[]
    attributeValueOptions?: (AttributeValue | SimpleAttributeValue)[]
}
