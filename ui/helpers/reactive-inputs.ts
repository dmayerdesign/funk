import { OnChanges, SimpleChanges } from '@angular/core'
import { ReplaySubject } from 'rxjs'

export default function<ComponentType extends OnChanges>(
  inputKeySubjectKeyPairs: [ keyof ComponentType, keyof ComponentType ][]
): ClassDecorator
{
  return (target: Function) =>
  {
    console.log('target:', target)
    const targetPrototype: ComponentType = target.prototype
    inputKeySubjectKeyPairs
      .forEach(([ _, subjectKey ]) =>
      {
        if (!targetPrototype[subjectKey])
        {
          console.log('targetPrototype', targetPrototype)
          targetPrototype[subjectKey] =
            new ReplaySubject<any>(1) as unknown as ComponentType[keyof ComponentType]
          (targetPrototype[subjectKey] as unknown as ReplaySubject<any>).subscribe()
        }
      })

    targetPrototype.ngOnChanges = function(changes: SimpleChanges): void
    {
      // const originalOnChanges: Function | null = typeof targetPrototype.ngOnChanges === 'function'
      //   ? targetPrototype.ngOnChanges.bind(target)
      //   : null
      // inputKeySubjectKeyPairs
      //   .filter(([ inputKey ]) => !!changes[inputKey as string])
      //   .forEach(([ inputKey, subjectKey ]) =>
      //   {
      //     try
      //     {
      //       console.log('this[subjectKey]', this[subjectKey])
      //       console.log('changes[inputKey as string].currentValue',
      //         changes[inputKey as string].currentValue)
      //       const subject = this[subjectKey] as unknown as ReplaySubject<any> | undefined
      //       if (subject)
      //       {
      //         subject.next(changes[inputKey as string].currentValue)
      //       }
      //     }
      //     catch (error)
      //     {
      //       console.log('caught', error)
      //     }
      //   })

      // if (originalOnChanges)
      // {
      //   originalOnChanges.call(this, ...arguments)
      // }
    }
  }
}
