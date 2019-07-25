import { AttributeValue } from '../attribute-value/attribute-value'
import { Attribute } from '../attribute/attribute'
import { Entity } from '../data-access/entity'
import { PageSettings } from '../page-settings/page-settings'
import { Taxonomy } from '../taxonomy/taxonomy'

export interface TaxonomyTerm extends Entity {
    taxonomy: Taxonomy
    singularName: string
    pluralName: string
    slug: string
    description: string

    // Tree properties.
    parent: TaxonomyTerm
    children: TaxonomyTerm[]

    // Defaults.
    defaultAttributes: Attribute[]
    defaultAttributeValues: AttributeValue[]

    // Page settings.
    pageSettings: PageSettings
    archiveGroupsTaxonomy: Taxonomy
    archiveTermGroups: TaxonomyTerm[]
}
