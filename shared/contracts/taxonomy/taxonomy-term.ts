import { DatabaseDocument } from '../data-access/database-document'
import { Taxonomy } from './taxonomy'

export interface TaxonomyTerm extends DatabaseDocument {
    taxonomy: Taxonomy
    singularName: string
    pluralName: string
    slug: string
    description: string
    children: TaxonomyTerm[]
}
