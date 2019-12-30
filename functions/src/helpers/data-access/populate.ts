import { store } from '@funk/plugins/db/store'

export interface PopulateFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: 'one-to-many' | 'one-to-one'
}

export default async function<PopulatedType, MarshalledType = any>(
  marshalledDoc: MarshalledType,
  options: PopulateFieldOptions<MarshalledType | PopulatedType>[],
): Promise<PopulatedType>
{
  const _populatedDoc = { ...marshalledDoc } as unknown as PopulatedType
  for (const { collectionPath, key, relationship } of options)
  {
    if (
      !marshalledDoc[key]
      || !(marshalledDoc[key] as unknown as (string | any[])).length
    )
    {
      continue
    }
    else if (relationship === 'one-to-one')
    {
      _populatedDoc[key] = await store().collection(collectionPath)
        .where('id', '==', marshalledDoc[key])
        .get()
        .then((snapshot) => snapshot.docs[0]
          && snapshot.docs[0].data() as PopulatedType[typeof key])
    }
    else
    {
      _populatedDoc[key] = await store().collection(collectionPath)
        .where('id', 'in', marshalledDoc[key])
        .get()
        .then((snapshot) => snapshot.docs
          && snapshot.docs.map((doc) => doc.data())
        ) as PopulatedType[typeof key]
    }
  }
  return _populatedDoc
}
