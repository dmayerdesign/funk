import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import listImpl from "@funk/persistence/application/internal/behaviors/list"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import { TAKE_ALL } from "@funk/persistence/model/pagination"
import { ReferenceOptions } from "@funk/persistence/model/reference-options"
import { get, set } from "lodash"

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
      if (!get(marshalledDoc, key)) {
        continue
      } else if (
        relationship === "one-to-one" &&
        typeof get(marshalledDoc, key) === "string"
      ) {
        set(
          _populatedDoc as any,
          key,
          await getById(
            collectionPath,
            (get(marshalledDoc, key) as unknown) as string,
          ),
        )
      } else {
        if (
          Array.isArray(get(marshalledDoc, key)) &&
          ((get(marshalledDoc, key) as unknown) as any[]).some(
            (x) => typeof x !== "string",
          )
        ) {
          continue
        }
        const searchListForInCondition = get(marshalledDoc, key) as any[]
        // Empty "in" arrays are not allowed.
        if (searchListForInCondition?.length) {
          set(
            _populatedDoc as any,
            key,
            ((await list({
              collection: collectionPath,
              pagination: {
                take: TAKE_ALL,
                skip: 0,
                orderBy: "id",
                orderByDirection: "desc",
              },
              conditions: [["id", "in", searchListForInCondition]],
            })) as unknown) as PopulatedType[typeof key],
          )
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
