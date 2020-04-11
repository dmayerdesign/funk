import { OnDestroy } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

interface MortalityAwareComponent extends OnDestroy {
  _funk_onDestroy$?: Subject<true>
}

export default function(): ClassDecorator
{
  return function(target: Function): void
  {
    const targetPrototype = target.prototype as MortalityAwareComponent
    if (!targetPrototype._funk_onDestroy$)
    {
      targetPrototype._funk_onDestroy$ = new Subject<true>()
      callOnDestroyThenEmit(targetPrototype)
    }
  }
}

export const _forLifeOf = <ValueType>(instance: MortalityAwareComponent) =>
{
  // TODO: Check to make sure the class is a component class.
  // (http://prideparrot.com/blog/archive/2018/7/extending_component_decorator_angular_6)
  // Check to make sure the class has the @MortalityAwareComponent decorator.
  const isMortalityAware = !!instance._funk_onDestroy$

  if (!isMortalityAware)
  {
    throw new Error(`Tried to use forLifeOf inside ${instance.constructor.name}, which `
      + `is not a @MortalityAwareComponent.`)
  }
  return takeUntil<ValueType>(instance!._funk_onDestroy$ as Observable<true>)
}


function callOnDestroyThenEmit(targetPrototype: MortalityAwareComponent): void
{
  const originalOnDestroy = typeof targetPrototype.ngOnDestroy === 'function'
    ? targetPrototype.ngOnDestroy.bind(targetPrototype.constructor)
    : null
  targetPrototype.ngOnDestroy = function(): void
  {
    if (originalOnDestroy)
    {
      originalOnDestroy()
    }
    this._funk_onDestroy$!.next(true)
  }
}
