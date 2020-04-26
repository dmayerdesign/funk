import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { Context } from '@funk/plugins/db/event/context'

export interface ChangeContext extends Context { }

export interface Change<DataType> {
  before: DocumentSnapshot<Partial<DataType>>
  after: DocumentSnapshot<Partial<DataType>>
}
