import { Diff } from "@funk/audit/model/diff"
import { diff } from "deep-diff"

export function construct() {
  return function <DocumentType = Record<string, unknown>>(
    beforeData: any,
    afterData: any,
  ): Diff<DocumentType>[] {
    return (diff(beforeData, afterData) as Diff<DocumentType>[]) ?? []
  }
}

export default construct()
