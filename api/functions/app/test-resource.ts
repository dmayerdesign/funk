import createRestFunction from "@funk/api/functions/helpers/http/create-rest-function"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { UserRole } from "@funk/model/auth/user-role"
import { StatusCode } from "@funk/model/http/status-code"

export default createRestFunction({
  get: [
    (_, response) => {
      response.status(StatusCode.NON_AUTHORITATIVE_INFORMATION)
      return 'Got a "get"!'
    },
  ],
  create: [authenticateForRoles([UserRole.OWNER]), () => 'Got a "create"!'],
})
