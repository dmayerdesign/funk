import { Change } from '@funk/model/audit/change'
const { diff } = require('diff-json')

export default function<DocumentType = object>(
  beforeData: any, afterData: any): Change<DocumentType>[]
{
  const changes = diff(
    beforeData,
    afterData,
  ) as Change<DocumentType>[]

  if (changes.length)
  {
    // Get rid of the misleading 'remove' change when a new document is inserted.
    if (beforeData === undefined
      && changes.length === 2
      && changes[0].key === '$root' && changes[1].key === '$root'
      && changes[0].type === 'remove' && changes[0].value === undefined)
    {
      changes.shift()
    }
  }

  return changes
}
