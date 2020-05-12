export interface PopulateFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: 'one-to-many' | 'one-to-one'
}

export default function<PopulatedType, MarshalledType = any>(
  marshalledDoc: MarshalledType,
  options: PopulateFieldOptions<MarshalledType>[],
): Promise<PopulatedType>
