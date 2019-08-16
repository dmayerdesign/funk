import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { filter, flatMap, share } from 'rxjs/operators'
import { Action } from './action'

export class StateManager<StateType> {
  public state$: Observable<StateType>
  private _state$: BehaviorSubject<StateType>
  private _dispatch$ = new ReplaySubject<Action<StateType>>(1)

  // One cool thing about this is that we can audit and even fine-tune this stream, like
  // using `concatMap` instead of `flatMap` to throttle requests.
  private _execution$ = this._dispatch$.pipe(
    flatMap(async (action) => {
      try {
        this._state$.next(
          await action.execute(this._state$.getValue())
        )
        return { action, state: this._state$.getValue() }
      }
      catch (error) {
        return { action, error }
      }
    }),
    share(),
  )

  constructor(initialState: StateType) {
    // Init state.
    this._state$ = new BehaviorSubject(initialState)
    this.state$ = this._state$.asObservable()

    // Start multicasting the execution stream.
    this._execution$.subscribe()
  }

  public dispatch(action: Action<StateType>): void {
    return this._dispatch$.next(action)
  }

  public dispatchOf<ActionType>(
    ...actionTypes: string[]
  ): Observable<ActionType> {
    return this._dispatch$.pipe(
      // @ts-ignore
      filter(({ type }: ActionType) => actionTypes.some((actionType) => type === actionType)),
      share(),
    )
  }

  public resultOf(
    ...actionTypes: string[]
  ): Observable<{ action: Action<StateType>, state?: StateType, error?: Error}> {
    return this._execution$.pipe(
      filter(({ action }) => actionTypes.some((actionType) => action.type === actionType)),
      share(),
    )
  }
}

export function createStateManager(initialState: any): StateManager<any> {
  return new StateManager(initialState)
}

export const INITIAL_STATE = new InjectionToken<any>('INITIAL_STATE')

@NgModule()
export class StateModule {
  public static forRoot<StateType = unknown>(initialState: StateType): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        {
          provide: INITIAL_STATE,
          useValue: initialState
        },
        {
          provide: StateManager,
          useFactory: createStateManager,
          deps: [ INITIAL_STATE ]
        }
      ]
    }
  }
}
