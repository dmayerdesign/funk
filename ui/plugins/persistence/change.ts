import { DocumentSnapshot } from "@funk/ui/plugins/persistence/document-snapshot"
import { Context } from "@funk/ui/plugins/persistence/event/context"
import { Change as FirebaseChange } from "firebase-functions"

export interface ChangeContext extends Context {}

export interface Change<DocumentType>
  extends FirebaseChange<
    DocumentSnapshot<Partial<DocumentType | FirebaseFirestore.DocumentData>>
  > {}
