import { construct as constructPopulate } from "@funk/persistence/application/external/behaviors/populate"
import getByIdImpl from "@funk/test/plugins/external/persistence/behaviors/get-by-id"
import listByIdsTestImpl from "@funk/test/plugins/external/persistence/behaviors/list-by-ids"

export function construct() {
  return constructPopulate(getByIdImpl, listByIdsTestImpl)
}

export default construct()
