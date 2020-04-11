import { OnDestroy, OnInit } from '@angular/core'
import MortalityAware from '@funk/ui/helpers/mortality-aware'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import forLifeOf from './for-life-of'

describe('forLifeOf', () =>
{
  it(`should throw if the component is not decorated with 'MortalityAware'`, () =>
  {
    let didThrow = false
    class MortalityAwareTestComponent implements OnInit, OnDestroy {
      public testSubject = new Subject<any>()
      public ngOnInit(): void
      {
        this.testSubject
          .pipe(forLifeOf(this))
          .subscribe(() => { })
      }
      public ngOnDestroy(): void { }
    }
    try
    {
      const component = new MortalityAwareTestComponent()
      component.ngOnInit()
    }
    catch
    {
      didThrow = true
    }

    expect(didThrow).toBe(true)
  })

  it(`should unsubscribe from any observables using 'forLifeOf(this)'`, () =>
  {
    @MortalityAware()
    class MortalityAwareTestComponent implements OnInit, OnDestroy {
      public shouldNeverBeGreaterThan3 = 0
      public testSubject = new Subject<any>()
      public testDownstream1 = this.testSubject.asObservable()
      public testDownstream2 = this.testDownstream1.pipe(map(() => 'test'))
      public ngOnInit(): void
      {
        this.testSubject
          .pipe(forLifeOf(this))
          .subscribe(() => this.shouldNeverBeGreaterThan3 += 1)

        this.testSubject
          .pipe(forLifeOf(this))
          .subscribe(() => this.shouldNeverBeGreaterThan3 += 1)

        this.testSubject
          .pipe(forLifeOf(this))
          .subscribe(() => this.shouldNeverBeGreaterThan3 += 1)
      }
      public ngOnDestroy(): void { }
    }
    const component = new MortalityAwareTestComponent()
    component.ngOnInit()

    component.testSubject.next()
    component.ngOnDestroy()
    component.testSubject.next()
    component.testSubject.next()

    expect(component.shouldNeverBeGreaterThan3).toBe(3)
  })
})
