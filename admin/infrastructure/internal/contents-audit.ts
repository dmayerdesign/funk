import { CONTENTS, ManagedContent } from "@funk/admin/model/managed-content/managed-content"
import auditOnWrite from "@funk/audit/helpers/internal/on-write"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  CONTENTS,
  auditOnWrite<ManagedContent>(`audit.${CONTENTS}`),
)
