import listPublished from '@funk/api/commerce/product/list-published'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export default createRpcFunction(
  async (
    { body }: RequestWithBody<Parameters<typeof listPublished>[0]>
  ): Promise<DatabaseDocument[]> =>
  {
    return await listPublished(body)
  }
)
