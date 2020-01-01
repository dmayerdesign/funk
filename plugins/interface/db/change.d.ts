import { Context } from './event/context'

export interface ChangeContext extends Context
{ }

export interface Change<DataType>
{
  before: {
    data(): Partial<DataType> | undefined
  }
  after: {
    data(): Partial<DataType> | undefined
  }
}
