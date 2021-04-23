import { AngularFirestore } from "@angular/fire/firestore"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export function construct(store: AngularFirestore) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await store
      .collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .set(
        { id: documentPath, ...documentData, updatedAt: Date.now() },
        { merge: !options?.overwrite },
      )
  }
}

export type SetById = ReturnType<typeof construct>
