import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Change, ChangeContext } from '@funk/plugins/persistence/change'
import { DocumentSnapshot } from '@funk/plugins/persistence/document-snapshot'
import { CloudFunction } from 'firebase-functions'

/** Respond to all document writes (creates, updates, or deletes). */
export function handleWrite<DocumentType extends DatabaseDocument = DatabaseDocument>(
  documentPath: string,
  handler: (change: Change<DocumentType>, context: ChangeContext) =>
  PromiseLike<any> | any): CloudFunction<Change<DocumentType>>
/** Respond only to document updates. */
export function handleUpdate<DocumentType extends DatabaseDocument = DatabaseDocument>(
  documentPath: string,
  handler: (change: Change<DocumentType>, context: ChangeContext) =>
  PromiseLike<any> | any): CloudFunction<Change<DocumentType>>
/** Respond only to document creations. */
export function handleCreate<DocumentType extends DatabaseDocument = DatabaseDocument>(
  documentPath: string,
  handler: (snapshot: DocumentSnapshot<DocumentType>, context: ChangeContext) =>
  PromiseLike<any> | any): CloudFunction<DocumentSnapshot<DocumentType>>
/** Respond only to document deletions. */
export function handleDelete<DocumentType extends DatabaseDocument = DatabaseDocument>(
  documentPath: string,
  handler: (snapshot: DocumentSnapshot<DocumentType>, context: ChangeContext) =>
  PromiseLike<any> | any): CloudFunction<DocumentSnapshot<DocumentType>>

