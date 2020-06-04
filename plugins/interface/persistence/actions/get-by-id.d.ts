import { DatabaseDocument } from "@funk/model/data-access/database-document"

export const construct: (store: any) => typeof getById

export default function getById<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
): Promise<DocumentType | undefined>

export type GetById = ReturnType<typeof construct>
