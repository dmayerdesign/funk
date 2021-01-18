import buildUrl from "@funk/model/ui/atlas/behaviors/build-url"

describe("buildUrl", () => {
  it("should build a menu item", () => {
    const url = buildUrl<any>("route-1", "sub-1")

    expect(url).toBe("/route-1/sub-1")
  })
})
