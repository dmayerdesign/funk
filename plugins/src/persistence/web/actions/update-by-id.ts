import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { AngularFirestore } from "@angular/fire/firestore"

export function construct(store: AngularFirestore)
{
  return async function<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void>
  {
    await store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .update(documentData)
  }
}

export type UpdateById = ReturnType<typeof construct>
