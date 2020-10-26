/* eslint-disable max-len */
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import {
  Change,
  CloudFunction,
  EventContext,
  firestore
} from "firebase-functions"

export function handleWrite<
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  documentPath: string,
  handler: (
    change: Change<
      FirebaseFirestore.DocumentSnapshot<
        DocumentType | FirebaseFirestore.DocumentData
      >
    >,
    context: EventContext,
  ) => PromiseLike<any> | any
): CloudFunction<
  Change<
    FirebaseFirestore.DocumentSnapshot<
      DocumentType | FirebaseFirestore.DocumentData
    >
  >
> {
  return firestore.document(documentPath).onWrite(handler)
}

export function handleUpdate<
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  documentPath: string,
  handler: (
    change: Change<
      FirebaseFirestore.DocumentSnapshot<
        DocumentType | FirebaseFirestore.DocumentData
      >
    >,
    context: EventContext,
  ) => PromiseLike<any> | any
): CloudFunction<
  Change<
    FirebaseFirestore.QueryDocumentSnapshot<
      DocumentType | FirebaseFirestore.DocumentData
    >
  >
> {
  return firestore.document(documentPath).onUpdate(handler)
}

export function handleCreate<
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  documentPath: string,
  handler: (
    change: FirebaseFirestore.DocumentSnapshot<
      DocumentType | FirebaseFirestore.DocumentData
    >,
    context: EventContext,
  ) => PromiseLike<any> | any
): CloudFunction<
  FirebaseFirestore.QueryDocumentSnapshot<
    DocumentType | FirebaseFirestore.DocumentData
  >
> {
  return firestore.document(documentPath).onCreate(handler)
}

export function handleDelete<
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  documentPath: string,
  handler: (
    change: FirebaseFirestore.DocumentSnapshot<
      DocumentType | FirebaseFirestore.DocumentData
    >,
    context: EventContext,
  ) => PromiseLike<any> | any
): CloudFunction<
  FirebaseFirestore.QueryDocumentSnapshot<
    DocumentType | FirebaseFirestore.DocumentData
  >
> {
  return firestore.document(documentPath).onDelete(handler)
}
