import { construct } from "@funk/ui/plugins/persistence/behaviors/populate"
import getByIdTestImpl from "@funk/ui/test/plugins/persistence/behaviors/get-by-id"
import listByIdsTestImpl from "@funk/ui/test/plugins/persistence/behaviors/list-by-ids"

export default construct(getByIdTestImpl, listByIdsTestImpl)
