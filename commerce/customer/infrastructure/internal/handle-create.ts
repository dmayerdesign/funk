import { authEvents } from "@funk/auth/plugins/internal/auth-events"
import handleCreate from "@funk/commerce/customer/application/internal/behaviors/handle-create"

export default authEvents().user().onCreate(handleCreate)
