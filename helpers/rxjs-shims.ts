import { of, pipe, Observable } from "rxjs"
import { catchError, filter, shareReplay } from "rxjs/operators"

export const ignoreNullish = <ValueType>() => pipe(
  filter<ValueType | undefined | null, ValueType>(
    ((value) => value != null) as
      (value: ValueType | undefined | null) => value is ValueType))

export const swallowErrorAndMapTo =
  <InputType, OutputType>(outputType: OutputType) =>
    pipe(catchError<InputType, Observable<OutputType>>(() =>
      of(outputType)))

export const shareReplayOnce = () => shareReplay(1)
