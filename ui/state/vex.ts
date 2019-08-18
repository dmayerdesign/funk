import { from, of, Observable, Subject } from 'rxjs'
import { catchError, filter, first, map, mergeScan, share, shareReplay, startWith, tap, withLatestFrom } from 'rxjs/operators'

export interface Action<StateType> {
  type: string
  resolve: (state: StateType) => (
    Promise<Partial<StateType>>
    | Observable<Partial<StateType>>
    | Partial<StateType>
  )
}

export interface ActionResult<StateType> {
  state: StateType
  actionType?: string
  error?: Error
}

export class Vex<StateType> {
  private _actionß = new Subject<Action<StateType>>()
  private _actionAuditß = new Subject<Action<StateType>>()
  private _resolution$: Observable<ActionResult<StateType>>
  public dispatch$: Observable<Action<StateType>>
  public dispatchAudit$: Observable<Action<StateType>>
  public state$: Observable<StateType>
  public stateAudit$: Observable<StateType>

  constructor(
    private _initialState: StateType,
  ) {
    this._resolution$ = this._actionß.pipe(
      tap((action) => this._actionAuditß.next(action)),
      mergeScan(
        ({ state }, action) => {
          let unresolvedNewStatePartial: Partial<StateType> | Promise<Partial<StateType>> | Observable<Partial<StateType>>

          // Handle synchronous error.
          try {
            unresolvedNewStatePartial = action.resolve(state)
          } catch (error) {
            return of({
              actionType: action.type,
              error
            })
          }

          // Handle asynchronous success or error.
          if (
            typeof (unresolvedNewStatePartial as Promise<Partial<StateType>>).then === 'function'
            || typeof (unresolvedNewStatePartial as Observable<Partial<StateType>>).subscribe === 'function'
          ) {
            const asyncNewStatePartial = unresolvedNewStatePartial as Promise<Partial<StateType>> | Observable<Partial<StateType>>
            return from(asyncNewStatePartial).pipe(
              first(),
              map((partial) => ({
                actionType: action.type,
                state: Object.assign(state, partial)
              })),
              catchError((error) => of({
                actionType: action.type,
                error
              }))
            )
          }

          // Handle synchronous success.
          return of({
            actionType: action.type,
            state: Object.assign(state, unresolvedNewStatePartial)
          })
        },
        { state: this._initialState },
      ),
      startWith({ state: this._initialState }),
      shareReplay(1),
    )
    this.state$ = this._resolution$.pipe(
      map(({ state }) => state),
      shareReplay(1),
    )
    this.stateAudit$ = this._actionAuditß.pipe(
      withLatestFrom(this.state$, (_action, state) => state),
    )
    this.dispatch$ = this._actionß.asObservable()
    this.dispatchAudit$ = this._actionAuditß.asObservable()
    this.state$.subscribe()
    this.stateAudit$.subscribe()
    this.dispatch$.subscribe()
    this.dispatchAudit$.subscribe()
  }

  public dispatch(action: Action<StateType>): void {
    return this._actionß.next(action)
  }

  public dispatchOf(
    ...actionTypes: string[]
  ): Observable<ActionResult<StateType>> {
    return this.dispatchAudit$.pipe(
      filter((action) => actionTypes.some(
        (actionType) => action.type === actionType
      )),
      withLatestFrom(this.stateAudit$),
      map(([ action, state ]) => ({ actionType: action.type, state })),
      share(),
    )
  }

  public resultOf(
    ...actionTypes: string[]
  ): Observable<ActionResult<StateType>> {
    return this._resolution$.pipe(
      filter((result) => actionTypes.some(
        (actionType) => result.actionType === actionType
      )),
      share(),
    )
  }
}

export function createVex(initialState: any): Vex<any> {
  return new Vex(initialState)
}
