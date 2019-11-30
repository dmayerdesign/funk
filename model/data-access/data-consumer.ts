import { Observable } from 'rxjs'

export interface DataConsumer<DataType>
{
  data$: Observable<DataType | undefined>
  connect: () => Observable<DataType | undefined>
  disconnect: () => void | Promise<void>
}
