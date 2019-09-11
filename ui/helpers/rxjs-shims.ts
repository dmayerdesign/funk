import { pipe, Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

export const ignoreNullish = <T>() => pipe<Observable<T>, Observable<T>>(
  filter<T>((value) => value != null)
)
