import { UserRole } from "@funk/auth/model/user-role"
import setCollectionFromCsv from "@funk/commerce/sku/application/internal/behaviors/set-collection-from-csv"
import csvMimeTypes from "@funk/helpers/csv/csv-mime-types"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

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
  },
)
