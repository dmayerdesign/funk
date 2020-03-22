import { pipe, Observable, UnaryFunction } from 'rxjs'
import { filter, map } from 'rxjs/operators'

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType | undefined | null, ValueType>(
    ((value) => value != null) as
      (value: ValueType | undefined | null) => value is ValueType,
  ),
)

export function mapToKey<
  ValueType extends { [key: string]: any },
  KeyType extends keyof ValueType
  >(key: KeyType): UnaryFunction<
    Observable<ValueType | undefined>,
    Observable<ValueType[typeof key] | undefined>
  >
{
  return pipe(map((value) => value?.[key]))
}
