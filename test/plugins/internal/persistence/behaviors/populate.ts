import { construct } from "@funk/persistence/application/internal/behaviors/populate"
import getByIdTestImpl from "@funk/test/plugins/internal/persistence/behaviors/get-by-id"
import listTestImpl from "@funk/test/plugins/internal/persistence/behaviors/list"

export default construct(getByIdTestImpl, listTestImpl)
