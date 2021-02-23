const atlas = {
  admin: {
    label: "Admin",
    __atlas__: {},
  },
  art: {
    label: "Art",
    __atlas__: {},
  },
  teaching: {
    label: "Teaching",
    __atlas__: {},
  },
  projects: {
    label: "Projects",
    __atlas__: {},
  },
  research: {
    label: "Research",
    __atlas__: {},
  },
  "c-v": {
    label: "C.V.",
    __atlas__: {},
  },
  about: {
    label: "About",
    __atlas__: {},
  },
  contact: {
    label: "Contact",
    __atlas__: {},
  },
}

export default atlas

export type AppAtlas = typeof atlas
export type AppPath = Exclude<keyof AppAtlas, "__atlas__">
