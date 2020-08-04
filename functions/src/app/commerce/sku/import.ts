import setCollectionFromCsv from "@funk/api/commerce/sku/set-collection-from-csv"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import { RequestWithBody } from "@funk/functions/model/request-response/request-with-body"
import csvMimeTypes from "@funk/helpers/csv/csv-mime-types"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER, UserRole.ADMINISTRATOR ]),
  async (request: RequestWithBody<string>) =>
  {
    const acceptsCsv = request.accepts(csvMimeTypes)
    if (acceptsCsv)
    {
      await setCollectionFromCsv(request.body)
    }
  }
)
