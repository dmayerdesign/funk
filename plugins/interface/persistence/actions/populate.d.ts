import { DatabaseDocument } from "@funk/model/data-access/database-document"

export interface PopulateFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: "one-to-many" | "one-to-one"
}

export default function<
  PopulatedType,
  MarshalledType = DatabaseDocument>(
  marshalledDoc: MarshalledType,
  options: PopulateFieldOptions<MarshalledType | PopulatedType>[]
): Promise<PopulatedType>
