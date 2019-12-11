export interface DatabaseDocument
{
  id: string
  slug?: string
}

export type DbDocumentInput<DocumentType extends DatabaseDocument> =
  Omit<DocumentType, 'id'>
