import { DatabaseDocument } from "@funk/model/data-access/database-document"

export const construct: (store: any) => typeof updateById

export default function updateById<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
  documentData: Partial<DocumentType>,
): Promise<void>
