import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { Change as FirebaseChange } from 'firebase-functions'
import { Context } from './event/context'

export interface ChangeContext extends Context
{ }

export interface Change<DocumentType>
  extends FirebaseChange<DocumentSnapshot<DocumentType>>
{ }
