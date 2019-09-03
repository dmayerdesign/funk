import { DataSource } from '@angular/cdk/table'
import { ActionResult } from '@dannymayer/vex'
import { Ease, TweenLite } from 'gsap'
import { pipe, Observable, Subject, UnaryFunction } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

export function MortalityAware(): ClassDecorator {
  return (target: any) => {
    if (!target.prototype.qb__onDestroy$) {
      const originalOnDestroy = typeof target.prototype.ngOnDestroy === 'function'
        ? target.prototype.ngOnDestroy.bind(target)
        : null

      target.prototype.qb__onDestroy$ = new Subject<true>()

      target.prototype.ngOnDestroy = function(): void {
        if (originalOnDestroy) {
          originalOnDestroy()
        }
        target.prototype.qb__onDestroy$.next(true)
      }
    }
  }
}

export const forLifeOf = <ValueType>(instance: any) => {
  // TODO: Check to make sure the class is a component class.
  // (http://prideparrot.com/blog/archive/2018/7/extending_component_decorator_angular_6)
  // Check to make sure the class has the @MortalityAwareComponent decorator.
  const isMortalityAware = !!instance.qb__onDestroy$

  if (!isMortalityAware) {
    throw new Error(`Tried to use forLifeOf inside ${instance.constructor.name}, which is not a @MortalityAwareComponent.`)
  }
  return takeUntil<ValueType>(instance.qb__onDestroy$)
}

// https://javascript.info/js-animation
export interface AnimateOptions {
  element: HTMLElement
  durationMs: number
  gsapEasingFn: Ease
  fromCss?: Partial<CSSStyleDeclaration>
  toCss?: Partial<CSSStyleDeclaration>
}

export class Animation {
  private _tween: TweenLite

  constructor (
    private _animateOptions: AnimateOptions
  ) { }

  public start(): void {
    const { durationMs, element, gsapEasingFn, toCss } = this._animateOptions
    this._tween = TweenLite.to(element, durationMs / 1000, {
      easing: gsapEasingFn,
      ...toCss
    })
  }

  public stop(): void {
    if (this._tween) {
      this._tween.kill()
    }
  }
}

export function animateTo(options: AnimateOptions): Animation {
  const animation = new Animation(options)
  animation.start()
  return animation
}

export class CollectionSource<DataType> extends DataSource<DataType> {
  constructor(
    public data$: Observable<DataType[]>,
  ) { super() }
  public connect = () => this.data$
  public disconnect = () => { }
}

// TODO: Get this working as an overload.
export function mapResultToState<StateType>(slice?: keyof StateType):
  UnaryFunction<Observable<ActionResult<StateType>>, Observable<StateType & StateType[keyof StateType]>>
{
  return pipe(
    map(({ state }) => !!slice ? state[slice] : state)
  ) as UnaryFunction<
    Observable<ActionResult<StateType>>,
    Observable<StateType & StateType[keyof StateType]>
  >
}
