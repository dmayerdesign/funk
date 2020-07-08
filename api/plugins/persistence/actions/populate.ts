import { DatabaseDocument } from "@funk/model/data-access/database-document"
import getByIdImpl from "@funk/api/plugins/persistence/actions/get-by-id"
import listImpl from "@funk/api/plugins/persistence/actions/list"
import { TAKE_ALL } from "@funk/api/plugins/persistence/pagination"

export interface PopulateFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: "one-to-many" | "one-to-one"
}

export function construct(getById = getByIdImpl, list = listImpl)
{
  return async function<
    PopulatedType,
    MarshalledType extends DatabaseDocument,
  >(
    marshalledDoc: MarshalledType,
    options: PopulateFieldOptions<MarshalledType | PopulatedType>[]
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
      else if (relationship === "one-to-one"
        && typeof marshalledDoc[key] === "string")
      {
        _populatedDoc[key] = await getById<any>(
          collectionPath, marshalledDoc[key] as unknown as string)
      }
      else
      {
        if (Array.isArray(marshalledDoc[key])
          && (marshalledDoc[key] as unknown as any[]).some((x) => typeof x !== "string"))
        {
          continue
        }
        _populatedDoc[key] = await list({
          collection: collectionPath,
          pagination: { take: TAKE_ALL, skip: 0, orderBy: "id", orderByDirection: "desc" },
          conditions: [[ "id", "in", marshalledDoc[key] ]],
        }) as unknown as PopulatedType[typeof key]
      }
    }
    return _populatedDoc
  }
}

export type Populate<
  PopulatedType,
  MarshalledType extends DatabaseDocument = any> = (
    marshalledDoc: MarshalledType,
    options: PopulateFieldOptions<MarshalledType | PopulatedType>[]
  ) => Promise<PopulatedType>

export default construct()
