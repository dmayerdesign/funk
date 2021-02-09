export interface Diff<DocumentType = Record<string, unknown>> {
  /** "New", "Deleted", "Edited", "Array" */
  kind: "N" | "D" | "E" | "A"
  path?: [keyof DocumentType, ...string[]]
  lhs?: any
  rhs?: any
  item?: Diff<any>
}
