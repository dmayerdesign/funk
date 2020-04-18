import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { Context } from '@funk/plugins/db/event/context'
import { Change as FirebaseChange } from 'firebase-functions'

export interface ChangeContext extends Context
{ }

export interface Change<DocumentType>
  extends FirebaseChange<DocumentSnapshot<Partial<DocumentType>>>
{ }
