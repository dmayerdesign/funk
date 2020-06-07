import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"

export const construct: (getById: GetById) => typeof populate

export default function populate<
  PopulatedType,
  MarshalledType = DatabaseDocument>(
  marshalledDoc: MarshalledType,
  options: PopulateFieldOptions<MarshalledType | PopulatedType>[]
): Promise<PopulatedType>

export interface PopulateFieldOptions<DocumentType> {
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: "one-to-many" | "one-to-one"
}

export type Populate = typeof populate
