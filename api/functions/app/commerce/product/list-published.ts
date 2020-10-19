import listPublished from "@funk/api/core/commerce/product/list-published"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default createRpcFunction(
  async ({
    body,
  }: RequestWithBody<Parameters<typeof listPublished>[0]>): Promise<
    DatabaseDocument[]
  > => await listPublished(body)
)
