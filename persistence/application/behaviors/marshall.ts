import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { values } from "lodash"

export type Marshalled<PopulatedType extends Record<string, any>> = Partial<
  Record<keyof PopulatedType, unknown>
> & { id: PrimaryKey }

export default function marshall<PopulatedType extends Record<string, any>>(
  populatedDoc: PopulatedType,
  keys: (keyof Marshalled<PopulatedType> & keyof PopulatedType)[],
): Marshalled<PopulatedType> {
  const _marshalledDoc = { ...populatedDoc } as Record<
    keyof PopulatedType,
    | PrimaryKey
    | PrimaryKey[]
    | Record<PrimaryKey, PrimaryKey>
    | Record<PrimaryKey, PrimaryKey[]>
  >
  for (const key of keys) {
    const value = populatedDoc[key]

    if (!value) continue

    if (typeof value?.id === "string") {
      _marshalledDoc[key] = value.id
    } else {
      _marshalledDoc[key] = values(
        (marshall(value, Object.keys(value)) as unknown) as ArrayLike<
          PrimaryKey
        >,
      )
    }
  }
  return _marshalledDoc as Marshalled<PopulatedType>
}

export type Marshall = typeof marshall
