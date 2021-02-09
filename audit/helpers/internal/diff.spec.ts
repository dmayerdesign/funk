import { construct } from "@funk/audit/helpers/internal/diff"

describe("diff", () => {
  it("should return an empty list when the objects are identical", () => {
    const diff = construct()
    const before = { foo: "hello foo" }
    const after = { foo: "hello foo" }
    expect(diff(before, after)).toEqual([])
  })

  it('should return a correctly-formed "first add" diff', () => {
    const diff = construct()
    const before = undefined
    const after = { foo: "hello foo" }
    expect(diff(before, after)).toEqual([
      {
        kind: "N",
        rhs: after,
      },
    ])
  })

  it('should return a correctly-formed "first add" diff for a field', () => {
    const diff = construct()
    const before = { foo: "hello foo" }
    const after = { foo: "hello foo", bar: 2 }
    expect(diff(before, after)).toEqual([
      {
        kind: "N",
        path: [ "bar" ],
        rhs: 2
      },
    ])
  })

  it('should return a correctly-formed "update" diff', () => {
    const diff = construct()
    const before = { foo: "hello foo", bar: 1 }
    const after = { foo: "hello foo", bar: 2 }
    expect(diff(before, after)).toEqual([
      {
        kind: "E",
        path: ["bar"],
        lhs: 1,
        rhs: 2
      },
    ])
  })

  it('should return a correctly-formed "remove" diff', () => {
    const diff = construct()
    const before = { foo: "hello foo", bar: 1 }
    const after = { foo: "hello foo" }
    expect(diff(before, after)).toEqual([
      {
        kind: "D",
        path: ["bar"],
        lhs: 1,
      },
    ])
  })

  it('should return a correctly-formed "remove all" diff', () => {
    const diff = construct()
    const before = { foo: "hello foo", bar: 1 }
    const after = undefined
    expect(diff(before, after)).toEqual(expect.arrayContaining([
      {
        kind: "D",
        lhs: before
      },
    ]))
  })

  it("should return a correctly-formed compound diff", () => {
    const diff = construct()
    const before = {
      name: "joe",
      age: 55,
      coins: [2, 5],
      children: [
        { name: "kid1", age: 1 },
        { name: "kid2", age: 2 },
      ],
    }
    const after = {
      name: "jane",
      coins: [2, 5, 1],
      children: [
        { name: "kid1", age: 0 },
        { name: "kid2", age: 2 },
        { name: "kid3", age: 3 },
      ],
    }
    expect(diff(before, after)).toEqual(expect.arrayContaining([
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
    ]))
  })
})

// {"kind": "E", "lhs": "joe", "path": ["name"], "rhs": "jane"}, {"kind": "D", "lhs": 55, "path": ["age"]}, {"index": 2, "item": {"kind": "N", "rhs": 1}, "kind": "A", "path": ["coins"]}, {"index": 2, "item": {"age": 3, "name": "kid3"}, "kind": "A", "path": ["children"]}, {"kind": "E", "lhs": 1, "path": ["children", 0, "age"], "rhs": 0}
// {"kind": "E", "lhs": "joe", "path": ["name"], "rhs": "jane"}, {"kind": "D", "lhs": 55, "path": ["age"]}, {"index": 2, "item": {"kind": "N", "rhs": 1}, "kind": "A", "path": ["coins"]}, {"index": 2, "item": {"kind": "N", "rhs": {"age": 3, "name": "kid3"}}, "kind": "A", "path": ["children"]}, {"kind": "E", "lhs": 1, "path": ["children", 0, "age"], "rhs": 0}
