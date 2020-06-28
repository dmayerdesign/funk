/* eslint-disable max-len */
const atlas = {
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
}

export default atlas

export type AppAtlas = typeof atlas
export type AppPath = keyof AppAtlas
export type ShopAtlas = typeof atlas["shop"]["__atlas__"]
export type ShopPath = keyof ShopAtlas
