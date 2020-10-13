import { Observable } from "rxjs"
import { first } from "rxjs/operators"

export const asPromise = (observable: Observable<any>) =>
  observable.pipe(first()).toPromise()
