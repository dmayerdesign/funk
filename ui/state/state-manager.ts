import { ModuleWithProviders, NgModule } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'
import { Action } from './action'

export class StateManager<StateType> {
  public state$: Observable<StateType>
  private _state$: BehaviorSubject<StateType>
  private _dispatch$ = new Subject<Action<StateType>>()
  private _execution$ = this._dispatch$.pipe(
    switchMap(async (behavior) => {
      try {
        this._state$.next(
          await behavior.execute(this._state$.getValue())
        )
        return { behavior, stateSnapshot: this._state$.getValue() }
      }
      catch (error) {
        return { behavior, error }
      }
    })
  )

  constructor(initialState: StateType) {
    this._state$ = new BehaviorSubject(initialState)
    this.state$ = this._state$.asObservable()
  }

  public dispatch(behavior: Action<StateType>): void {
    this._dispatch$.next(behavior)
  }

  public onDispatchOf<BehaviorType>(
    behaviorType: string
  ): Observable<BehaviorType> {
    return this._dispatch$.pipe<BehaviorType>(
      filter<any>(({ type }) => type === behaviorType)
    )
  }

  public onSuccessOf(
    behaviorType: string
  ): Observable<StateType> {
    return this._execution$.pipe(
      filter(({ behavior }) => behavior.type === behaviorType),
      filter(({ error }) => !error),
      map(({ stateSnapshot }) => stateSnapshot)
    )
  }

  public onFailureOf(
    behaviorType: string
  ): Observable<any> {
    return this._execution$.pipe(
      filter(({ behavior }) => behavior.type === behaviorType),
      filter(({ error }) => !!error),
      map(({ error }) => error)
    )
  }
}

@NgModule()
export class StateModule {
  public static forRoot<StateType = unknown>(initialState: StateType): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        { provide: StateManager, useValue: new StateManager(initialState) }
      ]
    }
  }
}
