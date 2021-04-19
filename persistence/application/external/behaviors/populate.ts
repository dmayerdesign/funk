import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { ListByIds } from "@funk/persistence/application/external/behaviors/list-by-ids"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { ReferenceOptions } from "@funk/persistence/model/reference-options"

export function construct(getById: GetById, listByIds: ListByIds) {
  return async function <
    PopulatedType extends DatabaseDocument = any,
    MarshalledType extends DatabaseDocument = any
  >(
    marshalledDoc: MarshalledType | undefined,
    options: ReferenceOptions<MarshalledType | PopulatedType>[],
  ): Promise<PopulatedType> {
    if (typeof marshalledDoc === "undefined") {
      return {} as PopulatedType
    }
    const _populatedDoc = ({ ...marshalledDoc } as unknown) as PopulatedType
    for (const { collectionPath, key, relationship } of options) {
      if (
        !marshalledDoc[key] ||
        !((marshalledDoc[key] as unknown) as string | any[]).length
      ) {
        continue
      } else if (relationship === "one-to-one") {
        _populatedDoc[key] = (await getById<PopulatedType[typeof key]>(
          collectionPath,
          (marshalledDoc[key] as unknown) as string,
        ))!
      } else {
        if (
          Array.isArray(marshalledDoc[key]) &&
          ((marshalledDoc[key] as unknown) as any[]).some(
            (x) => typeof x !== "string",
          )
        ) {
          continue
        }
        _populatedDoc[key] = (await listByIds<any>(
          collectionPath,
          (marshalledDoc[key] as unknown) as string[],
        )) as any
      }
    }
    return _populatedDoc
  }
}

export type Populate<
  PopulatedType,
  MarshalledType extends DatabaseDocument = any
> = (
  marshalledDoc: MarshalledType,
  options: ReferenceOptions<MarshalledType | PopulatedType>[],
) => Promise<PopulatedType>
