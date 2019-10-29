import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators'

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType | undefined, ValueType>(
    ((value) => typeof value !== 'undefined') as (value: ValueType | undefined) =>
      value is ValueType
  )
)
