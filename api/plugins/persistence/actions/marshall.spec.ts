import marshall from "@funk/api/plugins/persistence/actions/marshall"

describe("marshall", () =>
{
  it("should un-populate a populated document", () =>
  {
    const POPULATED_DOC = {
      id: "parent",
      children1: [ { id: "child 1-1" }, { id: "child 1-2" } ],
      children2: [ { id: "child 2-1" }, { id: "child 2-2" } ],
    }

    const marshalledDoc = marshall<any, typeof POPULATED_DOC>(
      POPULATED_DOC, [ "children1", "children2" ])

    expect(marshalledDoc).toEqual({
      id: "parent",
      children1: [ "child 1-1", "child 1-2" ],
      children2: [ "child 2-1", "child 2-2" ],
    })
  })
})
