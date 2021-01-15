import list from "@funk/api/core/commerce/product/list"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import { UserRole } from "@funk/model/auth/user-role"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

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
