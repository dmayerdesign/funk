import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"
import { Context } from "@funk/plugins/persistence/event/context"

export interface ChangeContext extends Context { }

export interface Change<DataType> {
  before: DocumentSnapshot<Partial<DataType>>
  after: DocumentSnapshot<Partial<DataType>>
}
