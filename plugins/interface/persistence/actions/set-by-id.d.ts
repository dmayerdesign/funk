import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default function<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
  documentData: DocumentType,
  options?: { overwrite?: boolean },
): Promise<void>
