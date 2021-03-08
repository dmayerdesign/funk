import marshall from "@funk/persistence/application/behaviors/marshall"

describe("marshall", () => {
  it("should un-populate a populated document", () => {
    const POPULATED_USER = {
      id: "parent",
      person: { id: "person id" },
      companies: [{ id: "company id 1" }, { id: "company id 2" }],
    }

    const marshalledUser = marshall<typeof POPULATED_USER>(POPULATED_USER, [
      "person",
      "companies",
    ])

    expect(marshalledUser).toEqual({
      id: "parent",
      person: "person id",
      companies: ["company id 1", "company id 2"],
    })
  })
})
