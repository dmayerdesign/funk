import { DatabaseDocument } from "@funk/model/data-access/database-document"
import {
  Change,
  CloudFunction,
  EventContext,
  firestore,
} from "firebase-functions"

export function handleWrite<DocumentType = DatabaseDocument>(
  documentPath: string,
  handler: (
    change: Change<FirebaseFirestore.DocumentSnapshot>,
    context: EventContext
  ) => PromiseLike<any> | any
): CloudFunction<Change<FirebaseFirestore.DocumentSnapshot<DocumentType>>> {
  return firestore.document(documentPath).onWrite(handler)
}

export function handleUpdate<DocumentType = DatabaseDocument>(
  documentPath: string,
  handler: (
    change: Change<FirebaseFirestore.DocumentSnapshot>,
    context: EventContext
  ) => PromiseLike<any> | any
): CloudFunction<
  Change<FirebaseFirestore.QueryDocumentSnapshot<DocumentType>>
> {
  return firestore.document(documentPath).onUpdate(handler)
}

export function handleCreate<DocumentType = DatabaseDocument>(
  documentPath: string,
  handler: (
    change: FirebaseFirestore.DocumentSnapshot,
    context: EventContext
  ) => PromiseLike<any> | any
): CloudFunction<FirebaseFirestore.QueryDocumentSnapshot<DocumentType>> {
  return firestore.document(documentPath).onCreate(handler)
}

export function handleDelete<DocumentType = DatabaseDocument>(
  documentPath: string,
  handler: (
    change: FirebaseFirestore.DocumentSnapshot,
    context: EventContext
  ) => PromiseLike<any> | any
): CloudFunction<FirebaseFirestore.QueryDocumentSnapshot<DocumentType>> {
  return firestore.document(documentPath).onDelete(handler)
}
