import { DocumentSnapshot } from "@funk/persistence/application/internal/document-snapshot"
import { Context } from "@funk/persistence/plugins/internal/events/context"
import firebase from "firebase"
import { Change as FirebaseChange } from "firebase-functions"

export interface ChangeContext extends Context {}

export interface Change<DocumentType>
  extends FirebaseChange<
    DocumentSnapshot<Partial<DocumentType | firebase.firestore.DocumentData>>
  > {}
