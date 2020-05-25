import { Injectable } from "@angular/core"
import { AngularFirestore, CollectionReference, Query } from "@angular/fire/firestore"
import { DatabaseDocument, DbDocumentMetadata } from "@funk/model/data-access/database-document"
import { construct as constructPopulate } from "@funk/ui/core/persistence/helpers/populate"
import { Persistence } from "@funk/ui/core/persistence/interface"
import { Observable } from "rxjs"
import { first, map } from "rxjs/operators"

@Injectable()
export class PersistenceApi implements Persistence
{
  public populate = constructPopulate({ store: () => this._store })

  public constructor(
    private _store: AngularFirestore
  )
  { }

  public listenById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string
  ): Observable<DocumentType | undefined>
  {
    return this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .valueChanges()
  }

  public async getById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string
  ): Promise<DocumentType | undefined>
  {
    return this._store.collection(collectionPath)
      .doc(documentPath)
      .get()
      .pipe(
        first(),
        map((snapshot) => snapshot.data() as DocumentType)
      )
      .toPromise()
  }

  public async setById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean }
  ): Promise<void>
  {
    await this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .set(documentData, { merge: !options?.overwrite })
  }

  public async updateById<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void>
  {
    await this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .update(documentData)
  }

  public async deleteById(
    collectionPath: string,
    documentPath: string
  ): Promise<void>
  {
    await this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .delete()
  }

  public queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<DbDocumentMetadata[]>
  {
    return selector(
      this._store.collection(collectionPath).ref
    )
      .get()
      .then((snapshot) => snapshot.docs.map((doc) =>
      {
        const fullPath = doc.ref.path
        const firstIndexOfSlash = fullPath.indexOf("/")
        return {
          collectionPath: fullPath.substring(0, firstIndexOfSlash),
          documentPath: fullPath.substring(firstIndexOfSlash),
        }
      }))
  }
}
