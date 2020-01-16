import { Action, ActionResult, Manager } from '@dannymayer/vex'
import { BehaviorSubject } from 'rxjs'

export const createStateManagerStub =
  <StateType extends any = any>(initialState: StateType = {} as any) => ({
    state$: new BehaviorSubject(initialState).asObservable(),
    getLookupKey: () => 'test',
    dispatch: (action: Action<StateType>) => { },
    once: (action: Action<StateType>) => new BehaviorSubject<ActionResult<StateType>>({
      actionType: action.type,
      state: initialState,
    }).asObservable(),
    dispatches: (actionType?: string) => new BehaviorSubject<ActionResult<StateType>>({
      actionType: actionType as string,
      state: initialState,
    }).asObservable(),
    results: (actionType?: string) => new BehaviorSubject<ActionResult<StateType>>({
      actionType: actionType as string,
      state: initialState,
    }).asObservable(),
  }) as Manager<StateType>
