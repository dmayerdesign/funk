import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { firestore } from "firebase-admin"

export type DocumentSnapshot<
  DocumentType extends { [key: string]: any } = DatabaseDocument
> = firestore.DocumentSnapshot<DocumentType>

export type QueryDocumentSnapshot<
  DocumentType extends { [key: string]: any } = DatabaseDocument
> = firestore.QueryDocumentSnapshot<DocumentType>
