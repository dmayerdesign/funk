import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators'

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType>((value) => value != null)
)
