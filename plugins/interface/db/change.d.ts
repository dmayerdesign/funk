export interface ChangeContext
{
  params: {
    [option: string]: any
  }
}

export interface Change<DataType>
{
  before: {
    data(): Partial<DataType> | undefined
  }
  after: {
    data(): Partial<DataType> | undefined
  }
}
