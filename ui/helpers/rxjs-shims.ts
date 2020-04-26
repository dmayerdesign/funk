import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators'

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType | undefined | null, ValueType>(
    ((value) => value != null) as
      (value: ValueType | undefined | null) => value is ValueType,
  ),
)
