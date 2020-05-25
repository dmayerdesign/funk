import { DatabaseDocument } from "@funk/model/data-access/database-document"
import getById from "@funk/plugins/persistence/actions/get-by-id"
import list from "@funk/plugins/persistence/actions/list"
import { TAKE_ALL } from "@funk/plugins/persistence/pagination"

export interface PopulateFieldOptions<DocumentType>
{
  collectionPath: string
  key: keyof DocumentType
  /** Defaults to `one-to-many`. */
  relationship?: "one-to-many" | "one-to-one"
}

export default async function<
  PopulatedType extends { [key: string]: DatabaseDocument | undefined },
  MarshalledType extends { [key: string]: string } = { [key: string]: string },
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
    else if (relationship === "one-to-one")
    {
      _populatedDoc[key] = await getById<any>(
        collectionPath, marshalledDoc[key])
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
