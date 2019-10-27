import { DatabaseDocument } from '@funk/model/data-access/database-document'

export interface Taxonomy extends DatabaseDocument {
    slug: string
    singularName?: string
    pluralName?: string
    description?: string
}
