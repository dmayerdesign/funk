import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { of, BehaviorSubject, Observable } from 'rxjs'
import { first, shareReplay } from 'rxjs/operators'

describe('rxjs-shims', () =>
{
  describe('ignoreNullish', () =>
  {
    it(`should ignore null`, async (done) =>
    {
      const subject = of(true, null)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1),
      )

      justTrue
        .pipe(first())
        .subscribe((onlyTrue) =>
        {
          expect(onlyTrue).toBe(true)
        })

      done()
    })
    it(`should ignore undefined`, async (done) =>
    {
      const subject = of(true, undefined)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1),
      )

      justTrue
        .pipe(first())
        .subscribe((onlyTrue) =>
        {
          expect(onlyTrue).toBe(true)
        })

      done()
    })
    it(`should allow false`, async (done) =>
    {
      const subject = new BehaviorSubject<boolean>(false)
      const justFalse = subject.pipe(ignoreNullish())
      expect(await justFalse.pipe(first()).toPromise())
        .toBe(false)
      done()
    })
    it(`should allow ''`, async (done) =>
    {
      const subject = new BehaviorSubject<string>('')
      const justEmptyString = subject.pipe(ignoreNullish())
      expect(await justEmptyString.pipe(first()).toPromise())
        .toBe('')
      done()
    })
  })
})
