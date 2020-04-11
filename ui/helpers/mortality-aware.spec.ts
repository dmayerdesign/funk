import { OnDestroy } from '@angular/core'
import MortalityAware from '@funk/ui/helpers/mortality-aware'
import { Subject } from 'rxjs'

describe('MortalityAware', () =>
{
  it(`should emit a value from '_funk_onDestroy$'`, () =>
  {
    @MortalityAware()
    class MortalityAwareTestComponent implements OnDestroy {
      public ngOnDestroy(): void { }
    }
    const component = new MortalityAwareTestComponent()
    const subject = (component as any)['_funk_onDestroy$'] as Subject<true>
    spyOn(subject, 'next')

    component.ngOnDestroy()

    expect(subject.next).toHaveBeenCalledTimes(1)
  })
})
