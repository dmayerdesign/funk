import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { ListByIds } from "@funk/ui/plugins/persistence/behaviors/list-by-ids"

export interface PopulateFieldOptions<DocumentType> {
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: "one-to-many" | "one-to-one"
}

export function construct(getById: GetById, listByIds: ListByIds) {
  return async function <
    PopulatedType extends DatabaseDocument = any,
    MarshalledType extends DatabaseDocument = any
  >(
    marshalledDoc: MarshalledType,
    options: PopulateFieldOptions<MarshalledType | PopulatedType>[]
  ): Promise<PopulatedType> {
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
          (marshalledDoc[key] as unknown) as string
        ))!
      } else {
        if (
          Array.isArray(marshalledDoc[key]) &&
          ((marshalledDoc[key] as unknown) as any[]).some(
            (x) => typeof x !== "string"
          )
        ) {
          continue
        }
        _populatedDoc[key] = (await listByIds<any>(
          collectionPath,
          (marshalledDoc[key] as unknown) as string[]
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
  options: PopulateFieldOptions<MarshalledType | PopulatedType>[],
) => Promise<PopulatedType>
