import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Change, ChangeContext } from '@funk/plugins/db/change'
import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { CloudFunction } from 'firebase-functions'

export declare namespace storeListener {
  export function document(path: string): DocumentBuilder

  export class DocumentBuilder {
    /** Respond to all document writes (creates, updates, or deletes). */
    public onWrite(handler: (change: Change<DatabaseDocument>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DatabaseDocument>>
    /** Respond only to document updates. */
    public onUpdate(handler: (change: Change<DatabaseDocument>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DatabaseDocument>>
    /** Respond only to document creations. */
    public onCreate(handler: (snapshot: DocumentSnapshot, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot>
    /** Respond only to document deletions. */
    public onDelete(handler: (snapshot: DocumentSnapshot, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot>
  }
}
