export interface Atlas {
  [path: string]: {
    label: string
    public?: boolean
    __atlas__?: Atlas
  }
}
