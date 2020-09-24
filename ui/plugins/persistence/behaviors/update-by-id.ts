import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { AngularFirestore } from "@angular/fire/firestore"

export function construct(store: AngularFirestore)
{
  return async function<DocumentType extends Record<string, unknown> = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void>
  {
    await store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .update({ ...documentData, updatedAt: Date.now() })
  }
}

export type UpdateById = ReturnType<typeof construct>
