import { ignoreNullish, swallowErrorAndMapTo } from "@funk/helpers/rxjs-shims"
import { BehaviorSubject, Observable, of } from "rxjs"
import { first, shareReplay } from "rxjs/operators"

describe("rxjsShims", () =>
{
  describe("ignoreNullish", () =>
  {
    it("should ignore null", async () =>
    {
      const subject = of(true, null)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1)
      )

      justTrue
        .pipe(first())
        .subscribe((onlyTrue) =>
        {
          expect(onlyTrue).toBe(true)
        })
    })
    it("should ignore undefined", async () =>
    {
      const subject = of(true, undefined)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1)
      )

      justTrue
        .pipe(first())
        .subscribe((onlyTrue) =>
        {
          expect(onlyTrue).toBe(true)
        })
    })
    it("should allow false", async () =>
    {
      const subject = new BehaviorSubject<boolean>(false)
      const justFalse = subject.pipe(ignoreNullish())
      expect(await justFalse.pipe(first()).toPromise())
        .toBe(false)
    })
    it("should allow ''", async () =>
    {
      const subject = new BehaviorSubject<string>("")
      const justEmptyString = subject.pipe(ignoreNullish())
      expect(await justEmptyString.pipe(first()).toPromise())
        .toBe("")
    })
  })

  describe("swallowErrorAndMapTo", () =>
  {
    it("should swallow an error and map to the provided value", async () =>
    {
      const throws$ = new Observable((subscriber) => subscriber.error(new Error()))
      const mapTo = {}
      const expectEqualsMapTo = await throws$
        .pipe(
          first(),
          swallowErrorAndMapTo(mapTo),
          shareReplay(1))
        .toPromise()
      expect(expectEqualsMapTo).toBe(mapTo)
    })
  })
})
