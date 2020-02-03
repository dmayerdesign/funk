import { Change as FirebaseChange } from 'firebase-functions'
import { DocumentSnapshot } from '../../interface/db/document-snapshot'
import { Context } from '../../interface/db/event/context'

export interface ChangeContext extends Context
{ }

export interface Change<DocumentType>
  extends FirebaseChange<DocumentSnapshot<Partial<DocumentType>>>
{ }
