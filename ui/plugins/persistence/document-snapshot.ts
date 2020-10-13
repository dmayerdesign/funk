import { DocumentSnapshot as FirestoreDocumentSnapshot } from "@angular/fire/firestore"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export type DocumentSnapshot<
  DocumentType extends { [key: string]: any } = DatabaseDocument
> = FirestoreDocumentSnapshot<DocumentType>
