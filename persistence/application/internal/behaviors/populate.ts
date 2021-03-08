import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import listImpl from "@funk/persistence/application/internal/behaviors/list"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import { TAKE_ALL } from "@funk/persistence/application/internal/pagination"
import { ReferenceOptions } from "@funk/persistence/model/reference-options"

export function construct(getById: typeof getByIdImpl, list: typeof listImpl) {
  return async function <PopulatedType>(
    marshalledDoc: Marshalled<PopulatedType> | undefined,
    options: ReferenceOptions<Marshalled<PopulatedType> | PopulatedType>[],
  ): Promise<PopulatedType> {
    if (typeof marshalledDoc === "undefined") {
      return {} as PopulatedType
    }
    const _populatedDoc = ({ ...marshalledDoc } as unknown) as PopulatedType
    for (const { collectionPath, key, relationship } of options) {
      if (!marshalledDoc[key]) {
        continue
      } else if (
        relationship === "one-to-one" &&
        typeof marshalledDoc[key] === "string"
      ) {
        _populatedDoc[key] = (await getById(
          collectionPath,
          (marshalledDoc[key] as unknown) as string,
        )) as any
      } else {
        if (
          Array.isArray(marshalledDoc[key]) &&
          ((marshalledDoc[key] as unknown) as any[]).some(
            (x) => typeof x !== "string",
          )
        ) {
          continue
        }
        const searchListForInCondition = marshalledDoc[key] as any[]
        // Empty "in" arrays are not allowed.
        if (searchListForInCondition?.length) {
          _populatedDoc[key] = ((await list({
            collection: collectionPath,
            pagination: {
              take: TAKE_ALL,
              skip: 0,
              orderBy: "id",
              orderByDirection: "desc",
            },
            conditions: [["id", "in", searchListForInCondition]],
          })) as unknown) as PopulatedType[typeof key]
        }
      }
    }
    return _populatedDoc
  }
}

export type Populate<PopulatedType> = (
  marshalledDoc: Marshalled<PopulatedType>,
  options: ReferenceOptions<Marshalled<PopulatedType> | PopulatedType>[],
) => Promise<PopulatedType>

export default construct(getByIdImpl, listImpl)
