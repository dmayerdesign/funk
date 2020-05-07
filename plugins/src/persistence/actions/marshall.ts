import { DatabaseDocument } from '@funk/model/data-access/database-document'

export default function<
  MarshalledType extends DatabaseDocument,
  PopulatedType extends DatabaseDocument>(
  populatedDoc: PopulatedType,
  keys: (keyof MarshalledType & keyof PopulatedType)[],
): MarshalledType
{
  const _marshalledDoc = { ...populatedDoc } as unknown as MarshalledType
  for (const key of keys)
  {
    const value = populatedDoc[key] as unknown as DatabaseDocument
    const relationship = typeof value === 'string' ? 'one-to-one' : 'one-to-many'

    if (!value || !(value as unknown as (string | any[])).length)
    {
      continue
    }
    else if (relationship === 'one-to-one')
    {
      _marshalledDoc[key] = value.id as any
    }
    else
    {
      if (Array.isArray(value)
        && (value as unknown as any[]).some((x) => typeof x === 'string'))
      {
        continue
      }
      _marshalledDoc[key] = (value as any as DatabaseDocument[]).map(({ id }) => id) as
        unknown as MarshalledType[keyof MarshalledType & keyof PopulatedType]
    }
  }
  return _marshalledDoc
}
