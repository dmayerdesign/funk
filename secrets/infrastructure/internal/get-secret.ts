import { UserRole } from "@funk/auth/model/user-role"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"
import getSecret from "@funk/secrets/application/internal/behaviors/get-secret"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  async ({ body }: RequestWithBody<string>): Promise<string | undefined> =>
    await getSecret(body),
)
