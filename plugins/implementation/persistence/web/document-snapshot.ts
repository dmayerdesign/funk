import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { DocumentSnapshot as FirestoreDocumentSnapshot } from "@google-cloud/firestore"

export interface DocumentSnapshot<
  DocumentType extends { [key: string]: any } = DatabaseDocument
>
  extends FirestoreDocumentSnapshot
{ }
