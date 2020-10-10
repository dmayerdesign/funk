import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { BehaviorSubject, Observable, of } from "rxjs"
import { first, shareReplay } from "rxjs/operators"

describe("rxjsShims", () => {
  describe("ignoreNullish", () => {
    it("should ignore null", async function () {
      const subject = of(true, null)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1)
      )

      justTrue.pipe(first()).subscribe((onlyTrue) => {
        expect(onlyTrue).toBe(true)
      })
    })
    it("should ignore undefined", async function () {
      const subject = of(true, undefined)
      const justTrue: Observable<boolean> = subject.pipe(
        ignoreNullish(),
        shareReplay(1)
      )

      justTrue.pipe(first()).subscribe((onlyTrue) => {
        expect(onlyTrue).toBe(true)
      })
    })
    it("should allow false", async function () {
      const subject = new BehaviorSubject<boolean>(false)
      const justFalse = subject.pipe(ignoreNullish())
      expect(await justFalse.pipe(first()).toPromise()).toBe(false)
    })
    it("should allow ''", async function () {
      const subject = new BehaviorSubject<string>("")
      const justEmptyString = subject.pipe(ignoreNullish())
      expect(await justEmptyString.pipe(first()).toPromise()).toBe("")
    })
  })
})
