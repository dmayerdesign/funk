import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Change, ChangeContext } from '@funk/plugins/persistence/change'
import { DocumentSnapshot } from '@funk/plugins/persistence/document-snapshot'
import { CloudFunction } from 'firebase-functions'

export declare namespace storeListener {
  export function document<DocumentType extends DatabaseDocument = DatabaseDocument>
    (path: string): DocumentBuilder<DocumentType>

  export class DocumentBuilder<DocumentType extends DatabaseDocument = DatabaseDocument> {
    /** Respond to all document writes (creates, updates, or deletes). */
    public onWrite(handler: (change: Change<DocumentType>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DocumentType>>
    /** Respond only to document updates. */
    public onUpdate(handler: (change: Change<DocumentType>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DocumentType>>
    /** Respond only to document creations. */
    public onCreate(handler: (snapshot: DocumentSnapshot<DocumentType>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot<DocumentType>>
    /** Respond only to document deletions. */
    public onDelete(handler: (snapshot: DocumentSnapshot<DocumentType>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot<DocumentType>>
  }
}
