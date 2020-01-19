import { Change, ChangeContext } from '@funk/plugins/db/change'
import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { CloudFunction } from 'firebase-functions'

export declare namespace storeListener {
  export function document(path: string): DocumentBuilder;

  export class DocumentBuilder {
    /** Respond to all document writes (creates, updates, or deletes). */
    onWrite(handler: (change: Change<DocumentSnapshot>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DocumentSnapshot>>;
    /** Respond only to document updates. */
    onUpdate(handler: (change: Change<DocumentSnapshot>, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<Change<DocumentSnapshot>>;
    /** Respond only to document creations. */
    onCreate(handler: (snapshot: DocumentSnapshot, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot>;
    /** Respond only to document deletions. */
    onDelete(handler: (snapshot: DocumentSnapshot, context: ChangeContext) =>
      PromiseLike<any> | any): CloudFunction<DocumentSnapshot>;
  }
}
