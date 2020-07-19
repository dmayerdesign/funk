import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { PrimaryKey } from "@funk/model/data-access/primary-key"

export interface TaxonomyTerm extends DatabaseDocument {
  taxonomyId: PrimaryKey
  singularName: string
  pluralName: string
  description: string
  /** @required */
  children?: TaxonomyTerm[]
  forInternalUseOnly: boolean
}

export const TAXONOMY_TERMS = "commerce.taxonomy-terms"
