import marshallImpl from "@funk/persistence/application/behaviors/marshall"

export type Marshalled<PopulatedType extends Record<string, any>> = Partial<
  Record<keyof PopulatedType, unknown>
>

export default function marshall<PopulatedType extends Record<string, any>>(
  populatedDoc: PopulatedType,
  keys: (keyof Marshalled<PopulatedType> & keyof PopulatedType)[],
): Marshalled<PopulatedType> {
  return marshallImpl(populatedDoc, keys)
}

export type Marshall = typeof marshall
