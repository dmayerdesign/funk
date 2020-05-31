import { Observable } from "rxjs"
import { first } from "rxjs/operators"

export function asPromise<ValueType>(
  observable: Observable<ValueType>
): Promise<ValueType>
{
  return observable.pipe(first()).toPromise()
}
