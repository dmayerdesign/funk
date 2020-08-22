export const DEFAULT_URL = "/poetry/contact"

const atlas = {
  "admin": {
    label: "Admin",
    __atlas__: {},
  },
  "sink": {
    label: "Kitchen Sink",
    __atlas__: {},
  },
  "shop": {
    label: "Shop",
    __atlas__: {
      "home": {
        label: "Home",
        __atlas__: {},
      },
      "checkout": {
        label: "Checkout",
        __atlas__: {
          "foo": {
            label: "Foo",
            __atlas__: {},
          },
        },
      },
    },
  },
  "poetry": {
    label: "Poetry",
    __atlas__: {
      "about": {
        label: "About Me",
      },
      "contact": {
        label: "Contact Me",
      },
      "honors": {
        label: "Honors",
      },
      "publications": {
        label: "Publications",
      },
      "teaching": {
        label: "Teaching",
      },
    },
  },
}

export default atlas

export type AppAtlas = typeof atlas
export type AppPath = Exclude<keyof AppAtlas, "__atlas__">
export type AdminAtlas = typeof atlas["admin"]["__atlas__"]
export type AdminPath = Exclude<keyof AdminAtlas, "__atlas__">
export type SinkAtlas = typeof atlas["sink"]["__atlas__"]
export type SinkPath = Exclude<keyof SinkAtlas, "__atlas__">
export type ShopAtlas = typeof atlas["shop"]["__atlas__"]
export type ShopPath = Exclude<keyof ShopAtlas, "__atlas__">
export type PoetryAtlas = typeof atlas["poetry"]["__atlas__"]
export type PoetryPath = Exclude<keyof PoetryAtlas, "__atlas__">
