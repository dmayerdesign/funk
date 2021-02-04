import { UserRole } from "@funk/auth/model/user-role"
import list from "@funk/commerce/product/application/internal/behaviors/list"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
  ]),
  async ({
    body,
  }: RequestWithBody<Parameters<typeof list>[0]>): Promise<
    DatabaseDocument[]
  > => await list(body),
)
