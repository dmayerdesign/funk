export interface Diff<DocumentType = Record<string, unknown>> {
  type: "add" | "update" | "remove"
  key: keyof DocumentType | "$root"
  value?: any
  oldValue?: any
}
