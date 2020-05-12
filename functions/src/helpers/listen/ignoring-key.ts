import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export default function<DocumentType extends DatabaseDocument>(
  key: keyof DocumentType,
  handler: ChangeHandler<DocumentType>,
): ChangeHandler<any>
{
  return async (change, context) =>
  {
    const { before, after } = change

    if (before.data()?.[key as string] !== after.data()?.[key as string]) return

    return handler(change, context)
  }
}
