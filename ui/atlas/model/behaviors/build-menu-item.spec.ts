import { Atlas } from "@funk/ui/atlas/model/atlas"
import {
    BuildMenuItem,
    construct
} from "@funk/ui/atlas/model/behaviors/build-menu-item"

describe("buildMenuItem", () => {
  let atlas: Atlas
  let buildMenuItem: BuildMenuItem<any>

  beforeEach(() => {
    atlas = {
      "route-1": {
        label: "Route 1",
        __atlas__: {
          "sub-1": {
            label: "Sub-route 1",
          },
        },
      },
      "route-2": {
        label: "Route 2",
      },
    }
    buildMenuItem = construct(atlas)
  })

  it("should build a menu item", () => {
    const menuItem = buildMenuItem("route-1", "sub-1")

    expect(menuItem.label).toBe("Sub-route 1")
    expect(menuItem.url).toBe("/route-1/sub-1")
  })
})
