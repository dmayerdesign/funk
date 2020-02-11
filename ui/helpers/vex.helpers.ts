import { ActionResult } from '@dannymayer/vex'
import { pipe, Observable, UnaryFunction } from 'rxjs'
import { map } from 'rxjs/operators'

// TODO: Convert to an overload signature.
export function mapResultToState<StateType>(slice?: keyof StateType):
  UnaryFunction<
    Observable<ActionResult<StateType>>,
    Observable<StateType & StateType[keyof StateType]>
  >
{
  return pipe(
    map(({ state }) => !!slice ? state[slice] : state),
  ) as UnaryFunction<
    Observable<ActionResult<StateType>>,
    Observable<StateType & StateType[keyof StateType]>
  >
}
