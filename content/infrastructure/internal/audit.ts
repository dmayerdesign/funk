import auditOnWrite from "@funk/audit/helpers/internal/on-write"
import { Content, CONTENTS } from "@funk/content/model/content"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  CONTENTS,
  auditOnWrite<Content>(`audit.admin.${CONTENTS}`),
)
