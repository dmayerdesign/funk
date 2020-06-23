import { Observable, of, pipe } from "rxjs"
import { catchError, filter, shareReplay, map } from "rxjs/operators"

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType | undefined | null, ValueType>(
    ((value) => value != null) as
      (value: ValueType | undefined | null) => value is ValueType))

export const assertNotNullish = <ValueType>() => pipe(
  map<ValueType | undefined | null, ValueType>((value) => value!))

export const swallowErrorAndMapTo =
  <InputType, OutputType>(outputType: OutputType) =>
    pipe(catchError<InputType, Observable<OutputType>>(() =>
      of(outputType)))

export const shareReplayOnce = <ValueType>() => shareReplay<ValueType>(1)
