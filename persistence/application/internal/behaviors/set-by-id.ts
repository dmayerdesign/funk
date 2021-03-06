import { store as storeImpl } from "@funk/persistence/application/internal/server-store"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { Marshalled } from "./marshall"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Marshalled<DatabaseDocument> = Marshalled<
      DatabaseDocument
    >
  >(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await store()
      .collection(collectionPath)
      .doc(documentPath)
      .set(
        {
          id: documentPath,
          removedAt: null,
          ...documentData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        { merge: !options?.overwrite },
      )
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(storeImpl)
