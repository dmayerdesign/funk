import { Context } from '@funk/plugins/db/event/context'
import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'

export interface ChangeContext extends Context
{ }

export interface Change<DataType>
{
  before: DocumentSnapshot<Partial<DataType>>
  after: DocumentSnapshot<Partial<DataType>>
}
