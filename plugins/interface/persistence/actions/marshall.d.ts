export interface MarshallFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
}

export default function<MarshalledType, PopulatedType = any>(
  populatedDoc: PopulatedType,
  options: MarshallFieldOptions<PopulatedType | MarshalledType>[],
): Promise<MarshalledType>
