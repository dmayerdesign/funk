import loudlyLog from "@funk/helpers/loudly-log"
import { tap } from "rxjs/operators"

export function tapAndLog<ValueType>(message: string, loud = false) {
  if (loud) {
    return tap<ValueType>((x) => loudlyLog(message, x))
  }
  return tap<ValueType>((x) => console.log(message, x))
}
