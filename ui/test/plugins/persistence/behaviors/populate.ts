import { construct as constructPopulate } from "@funk/ui/plugins/persistence/behaviors/populate"
import getByIdImpl from "@funk/ui/test/plugins/persistence/behaviors/get-by-id"
import listByIdsTestImpl from "@funk/ui/test/plugins/persistence/behaviors/list-by-ids"

export function construct(..._args: any[]) {
  return constructPopulate(getByIdImpl, listByIdsTestImpl)
}

export default construct()
