import { SimpleChanges } from '@angular/core'
import { ReplaySubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

export function MortalityAware(): ClassDecorator
{
  return function(target: Function): void
  {
    if (!target.prototype.funk__onDestroy$)
    {
      const originalOnDestroy = typeof target.prototype.ngOnDestroy === 'function'
        ? target.prototype.ngOnDestroy.bind(target)
        : null

      target.prototype.funk__onDestroy$ = new Subject<true>()

      target.prototype.ngOnDestroy = function(): void
      {
        if (originalOnDestroy)
        {
          originalOnDestroy()
        }
        target.prototype.funk__onDestroy$.next(true)
      }
    }
  }
}

export function ReactiveInputs<ComponentType extends any>(
  inputKeySubjectKeyPairs: [ keyof ComponentType, keyof ComponentType ][]
): ClassDecorator
{
  return (target: Function) =>
  {
    const originalOnChanges: Function | null = typeof target.prototype.ngOnChanges === 'function'
      ? target.prototype.ngOnChanges.bind(target)
      : null

    target.prototype.ngOnChanges = function(changes: SimpleChanges): void
    {
      inputKeySubjectKeyPairs
        .filter(([ inputKey ]) => !!changes[inputKey as string])
        .forEach(([ inputKey, subjectKey ]) =>
        {
          if (!this[subjectKey])
          {
            this[subjectKey] = new ReplaySubject<any>(1)
            this[subjectKey].subscribe()
          }

          const subject = this[subjectKey] as ReplaySubject<any>
          subject.next(changes[inputKey as string].currentValue)
        })

      if (originalOnChanges)
      {
        originalOnChanges.call(this, ...arguments)
      }
    }
  }
}

export const forLifeOf = <ValueType>(instance: any) =>
{
  // TODO: Check to make sure the class is a component class.
  // (http://prideparrot.com/blog/archive/2018/7/extending_component_decorator_angular_6)
  // Check to make sure the class has the @MortalityAwareComponent decorator.
  const isMortalityAware = !!instance.funk__onDestroy$

  if (!isMortalityAware)
  {
    throw new Error(`Tried to use forLifeOf inside ${instance.constructor.name}, which is not a @MortalityAwareComponent.`)
  }
  return takeUntil<ValueType>(instance.funk__onDestroy$)
}

export interface Initializer
{
  init: () => Promise<any>
}
