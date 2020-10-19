import setCollectionFromCsv from "@funk/api/core/commerce/sku/set-collection-from-csv"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import csvMimeTypes from "@funk/helpers/csv/csv-mime-types"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
  ]),
  async (request: RequestWithBody<string>) => {
    const acceptsCsv = request.accepts(csvMimeTypes)
    if (acceptsCsv) {
      await setCollectionFromCsv(request.body)
    }
  }
)
