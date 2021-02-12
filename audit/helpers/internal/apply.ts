import { Diff } from "@funk/audit/model/diff"
import { applyChange, Diff as DeepDiff } from "deep-diff"
import { cloneDeep, isEmpty, isEqual, isNil } from "lodash"

export function construct() {
  return function <DocumentType = Record<string, unknown>>(
    beforeData: Partial<DocumentType> | undefined,
    diffs: Diff[],
  ): Partial<DocumentType> | undefined {
    const _diffs = [ ...diffs ]
    const keysUniqueToNetNewDiff = [ "kind", "rhs" ].sort()
    const keysUniqueToRemoveAllDiff = [ "kind", "lhs" ].sort()

    const isNilOrEmpty = isNil(beforeData) || isEmpty(beforeData)
    let afterData = cloneDeep(beforeData)

    if (isNilOrEmpty && _diffs.length > 0) {
      afterData = {}
    }

    _diffs.forEach((diff) => {
      const diffKeys = !!diff ? Object.keys(diff).sort() : []
      const isRemoveAll = diff?.kind === "D" && isEqual(diffKeys, keysUniqueToRemoveAllDiff)
      const isNetNew = diff?.kind === "N" && isEqual(diffKeys, keysUniqueToNetNewDiff)

      if (isRemoveAll) {
        afterData = undefined
      } else if (isNetNew) {
        afterData = diff.rhs
      } else {
        applyChange(afterData, afterData, diff as DeepDiff<any, any>)
      }
    })

    return afterData
  }
}

export default construct()
