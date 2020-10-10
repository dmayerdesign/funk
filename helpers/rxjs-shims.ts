import { pipe } from "rxjs"
import { filter, shareReplay, map } from "rxjs/operators"

export const ignoreNullish = <ValueType>() =>
  pipe(
    filter<ValueType | undefined | null, ValueType>(
      ((value) => value != null) as (
        value: ValueType | undefined | null
      ) => value is ValueType
    )
  )

export const assertNotNullish = <ValueType>() =>
  pipe(map<ValueType | undefined | null, ValueType>((value) => value!))

export const shareReplayOnce = <ValueType>() => shareReplay<ValueType>(1)

export const maybePluck = <
  ValueType,
  KeyType extends keyof NonNullable<ValueType>
>(
  key: KeyType
) =>
  pipe(
    map<ValueType, NonNullable<ValueType>[KeyType] | undefined>(
      (input) => input?.[key]
    )
  )
