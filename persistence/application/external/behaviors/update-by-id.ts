import { AngularFirestore } from "@angular/fire/firestore"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export function construct(store: AngularFirestore) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void> {
    await store
      .collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .update({ ...documentData, updatedAt: Date.now() })
  }
}

export type UpdateById = ReturnType<typeof construct>
