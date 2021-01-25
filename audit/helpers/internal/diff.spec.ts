import { construct } from "@funk/audit/helpers/internal/diff"

describe("diff", () => {
  it("should return an empty list when the objects are identical", () => {
    const diff = construct()
    const before = { foo: "foo" }
    const after = { foo: "foo" }
    expect(diff(before, after)).toEqual([])
  })

  it('should return a correctly-formed "first add" diff', () => {
    const diff = construct()
    const before = undefined
    const after = { foo: "foo" }
    expect(diff(before, after)).toEqual([
      {
        type: "add",
        key: "$root",
        value: { foo: "foo" },
      },
    ])
  })

  it('should return a correctly-formed "first add" diff for a field', () => {
    const diff = construct()
    const before = { foo: "foo" }
    const after = { foo: "foo", bar: 2 }
    expect(diff(before, after)).toEqual([
      {
        type: "add",
        key: "bar",
        value: 2,
      },
    ])
  })

  it('should return a correctly-formed "update" diff', () => {
    const diff = construct()
    const before = { foo: "foo", bar: 1 }
    const after = { foo: "foo", bar: 2 }
    expect(diff(before, after)).toEqual([
      {
        type: "update",
        key: "bar",
        oldValue: 1,
        value: 2,
      },
    ])
  })

  it('should return a correctly-formed "remove" diff', () => {
    const diff = construct()
    const before = { foo: "foo", bar: 1 }
    const after = { foo: "foo" }
    expect(diff(before, after)).toEqual([
      {
        type: "remove",
        key: "bar",
        value: 1,
      },
    ])
  })

  it('should return a correctly-formed "remove all" diff', () => {
    const diff = construct()
    const before = { foo: "foo", bar: 1 }
    const after = undefined
    expect(diff(before, after)).toEqual([
      {
        type: "remove",
        key: "$root",
        value: { foo: "foo", bar: 1 },
      },
    ])
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
      name: "smith",
      coins: [2, 5, 1],
      children: [
        { name: "kid1", age: 0 },
        { name: "kid2", age: 2 },
        { name: "kid3", age: 3 },
      ],
    }
    expect(diff(before, after)).toEqual([
      {
        type: "update",
        key: "name",
        value: "smith",
        oldValue: "joe",
      },
      {
        type: "update",
        key: "coins",
        embededKey: "$index",
        changes: [{ type: "add", key: "2", value: 1 }],
      },
      {
        type: "update",
        key: "children",
        embededKey: "$index",
        changes: [
          {
            type: "update",
            key: "0",
            changes: [{ type: "update", key: "age", value: 0, oldValue: 1 }],
          },
          {
            type: "add",
            key: "2",
            value: { name: "kid3", age: 3 },
          },
        ],
      },
      {
        type: "remove",
        key: "age",
        value: 55,
      },
    ])
  })
})
