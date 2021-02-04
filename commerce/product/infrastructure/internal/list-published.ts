import listPublished from "@funk/commerce/product/application/internal/behaviors/list-published"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export default createRpcFunction(
  async ({
    body,
  }: RequestWithBody<Parameters<typeof listPublished>[0]>): Promise<
    DatabaseDocument[]
  > => await listPublished(body),
)
