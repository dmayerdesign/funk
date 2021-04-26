import { Content, CONTENTS } from "@funk/admin/content/model/content"
import auditOnWrite from "@funk/audit/helpers/internal/on-write"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  CONTENTS,
  auditOnWrite<Content>(`audit.admin.${CONTENTS}`),
)
