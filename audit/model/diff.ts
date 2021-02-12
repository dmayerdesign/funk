export interface Diff<DocumentType = Record<string, unknown>, NewType = DocumentType> {
  /** "New", "Deleted", "Edited", "Array" */
  kind: "N" | "D" | "E" | "A"
  path?: [keyof DocumentType, ...(string | number)[]]
  lhs?: any
  rhs?: any
  item?: Diff<any>
  /** @type Integer */
  index?: number
}
