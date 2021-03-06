import { Observable } from "rxjs"
import { first } from "rxjs/operators"

export const asPromise = <ValueType = any>(observable: Observable<ValueType>) =>
  observable.pipe(first()).toPromise()
