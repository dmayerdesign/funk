import handleCreate from "@funk/api/core/commerce/customer/handle-create"
import { authEvents } from "@funk/api/plugins/auth/auth-events"

export default authEvents().user().onCreate(handleCreate)
