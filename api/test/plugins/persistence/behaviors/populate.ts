import { construct } from "@funk/api/plugins/persistence/behaviors/populate"
import getByIdTestImpl from "@funk/api/test/plugins/persistence/behaviors/get-by-id"
import listTestImpl from "@funk/api/test/plugins/persistence/behaviors/list"

export default construct(getByIdTestImpl, listTestImpl)
