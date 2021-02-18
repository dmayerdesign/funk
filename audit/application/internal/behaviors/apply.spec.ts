import { construct } from "@funk/audit/application/internal/behaviors/apply"
import { Diff } from "@funk/audit/model/diff"

describe("apply", () => {
  it("should apply an empty diff", () => {
    const apply = construct()

    const before = { foo: "hello foo" }
    const expectedAfter = before
    const diffs: Diff[] = []
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)

    const before2 = { foo: "hello foo" }
    const expectedAfter2 = before2
    const diffs2: Diff[] = []
    expect(apply(before2, diffs2)).toEqual(expectedAfter2)

    const before3 = undefined
    const expectedAfter3 = before3
    const diffs3: Diff[] = []
    expect(apply(before3, diffs3)).toEqual(expectedAfter3)
  })

  it('should apply a "first add" diff', () => {
    const apply = construct()
    const before = undefined
    const expectedAfter = { foo: "hello foo" }
    const diffs: Diff[] = [
      {
        kind: "N",
        rhs: expectedAfter,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })

  it('should apply a "first add" diff for a field', () => {
    const apply = construct()
    const before = { foo: "hello foo" }
    const expectedAfter = { foo: "hello foo", bar: 2 }
    const diffs: Diff[] = [
      {
        kind: "N",
        path: [ "bar" ],
        rhs: 2,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })

  it('should apply an "update" diff', () => {
    const apply = construct()
    const before = { foo: "hello foo", bar: 1 }
    const expectedAfter = { foo: "hello foo", bar: 2 }
    const diffs: Diff[] = [
      {
        kind: "E",
        path: ["bar"],
        lhs: 1,
        rhs: 2,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })

  it('should apply a "remove" diff', () => {
    const apply = construct()
    const before = { foo: "hello foo", bar: 1 }
    const expectedAfter = { foo: "hello foo" }
    const diffs: Diff[] = [
      {
        kind: "D",
        path: ["bar"],
        lhs: 1,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })

  it('should apply a "remove all" diff', () => {
    const apply = construct()
    const before = { foo: "hello foo", bar: 1 }
    const expectedAfter = undefined
    const diffs: Diff[] = [
      {
        kind: "D",
        lhs: before,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })

  it("should apply a compound diff", () => {
    const apply = construct()
    const before = {
      name: "joe",
      age: 55,
      coins: [2, 5],
      children: [
        { name: "kid1", age: 1 },
        { name: "kid2", age: 2 },
      ],
    }
    const expectedAfter = {
      name: "jane",
      coins: [2, 5, 1],
      children: [
        { name: "kid1", age: 0 },
        { name: "kid2", age: 2 },
        { name: "kid3", age: 3 },
      ],
    }
    const diffs: Diff[] = [
      {
        kind: "E",
        path: ["name"],
        lhs: "joe",
        rhs: "jane",
      },
      {
        kind: "D",
        path: ["age"],
        lhs: 55,
      },
      {
        kind: "A",
        path: ["coins"],
        index: 2,
        item: { kind: "N", rhs: 1 },
      },
      {
        kind: "A",
        path: ["children"],
        index: 2,
        item: { kind: "N", rhs: { name: "kid3", age: 3 } },
      },
      {
        kind: "E",
        path: ["children", 0, "age"],
        lhs: 1,
        rhs: 0,
      },
    ]
    const after = apply(before, diffs)
    expect(after).toEqual(expectedAfter)
  })
})
