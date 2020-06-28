export interface Atlas {
  [path: string]: {
    label: string
    __atlas__?: Atlas
  }
}
