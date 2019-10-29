import { OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

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

export interface ModuleApi {
  init: () => any
  destroy?: () => any
}

export abstract class ModuleContainer implements OnInit, OnDestroy {
  constructor(
    public api: ModuleApi
  ) { }

  public ngOnInit(): void {
    this.api.init()
  }

  public ngOnDestroy(): void {
    if (this.api.destroy) {
      this.api.destroy()
    }
  }
}
