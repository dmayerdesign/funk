import { UserRole } from "@funk/auth/model/user-role"
import { StatusCode } from "@funk/http/model/status-code"
import createRestFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rest-function"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRestFunction({
  get: [
    (_, response) => {
      response.status(StatusCode.NON_AUTHORITATIVE_INFORMATION)
      return 'Got a "get"!'
    },
  ],
  create: [authenticateForRoles([UserRole.OWNER]), () => 'Got a "create"!'],
})
