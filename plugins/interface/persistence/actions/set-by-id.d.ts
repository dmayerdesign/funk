import { DatabaseDocument } from "@funk/model/data-access/database-document"

export const construct: (store: any) => typeof setById

export default function setById<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
  documentData: DocumentType,
  options?: { overwrite?: boolean },
): Promise<void>
