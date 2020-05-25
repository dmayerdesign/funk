import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default function<
  MarshalledType extends DatabaseDocument,
  PopulatedType extends DatabaseDocument>(
  populatedDoc: PopulatedType,
  options: (keyof MarshalledType & keyof PopulatedType)[],
): MarshalledType
