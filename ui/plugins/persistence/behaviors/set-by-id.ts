import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { AngularFirestore } from "@angular/fire/firestore"

export function construct(store: AngularFirestore) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean }
  ): Promise<void> {
    await store
      .collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .set(
        { ...documentData, updatedAt: Date.now() },
        { merge: !options?.overwrite }
      )
  }
}

export type SetById = ReturnType<typeof construct>
