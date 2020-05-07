import { DocumentSnapshot } from '@funk/plugins/persistence/document-snapshot'
import { Context } from '@funk/plugins/persistence/event/context'
import { Change as FirebaseChange } from 'firebase-functions'

export interface ChangeContext extends Context
{ }

export interface Change<DocumentType>
  extends FirebaseChange<DocumentSnapshot<Partial<DocumentType>>>
{ }
