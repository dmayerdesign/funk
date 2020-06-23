import { Diff } from "@funk/model/audit/diff"
const { diff } = require("diff-json")

export function construct()
{
  return function<DocumentType = object>(
    beforeData: any, afterData: any): Diff<DocumentType>[]
  {
    const changes = diff(
      beforeData,
      afterData
    ) as Diff<DocumentType>[]

    if (changes.length)
    {
      // Get rid of the misleading 'remove' change when a new document is inserted.
      if (changes.length === 2
        && changes[0].key === "$root" && changes[1].key === "$root"
        && changes[0].type === "remove" && changes[0].value === undefined
        && changes[1].type === "add")
      {
        changes.shift()
      }

      // Get rid of the misleading 'add' change when an entire document is removed.
      if (changes.length === 2
        && changes[0].key === "$root" && changes[1].key === "$root"
        && changes[1].type === "add" && changes[1].value === undefined
        && changes[0].type === "remove")
      {
        changes.pop()
      }
    }

    return changes
  }
}

export default construct()
