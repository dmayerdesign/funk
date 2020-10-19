import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import getSecret from "@funk/api/plugins/secrets/behaviors/get-secret"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  async ({ body }: RequestWithBody<string>): Promise<string | undefined> =>
    await getSecret(body)
)
