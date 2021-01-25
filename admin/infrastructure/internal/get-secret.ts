import getSecret from "@funk/admin/plugins/internal/secrets/behaviors/get-secret"
import { UserRole } from "@funk/auth/domain/user-role"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  async ({ body }: RequestWithBody<string>): Promise<string | undefined> =>
    await getSecret(body),
)
