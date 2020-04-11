import { OnChanges, SimpleChanges } from '@angular/core'
import { ReplaySubject } from 'rxjs'

export default function<ComponentType extends OnChanges>(
  inputKeySubjectKeyPairs: [ keyof ComponentType, keyof ComponentType ][]
): ClassDecorator
{
  return (target: Function) =>
  {
    const targetPrototype: ComponentType = target.prototype
    const originalOnChanges: Function | null = typeof targetPrototype.ngOnChanges === 'function'
      ? targetPrototype.ngOnChanges.bind(target)
      : null

    targetPrototype.ngOnChanges = function(changes: SimpleChanges): void
    {
      inputKeySubjectKeyPairs
        .filter(([ inputKey ]) => !!changes[inputKey as string])
        .forEach(([ inputKey, subjectKey ]) =>
        {
          if (!this[subjectKey])
          {
            this[subjectKey] =
              new ReplaySubject<any>(1) as unknown as ComponentType[keyof ComponentType]
            (this[subjectKey] as unknown as ReplaySubject<any>).subscribe()
          }

          const subject = this[subjectKey] as unknown as ReplaySubject<any>
          subject.next(changes[inputKey as string].currentValue)
        })

      if (originalOnChanges)
      {
        originalOnChanges.call(this, ...arguments)
      }
    }
  }
}
