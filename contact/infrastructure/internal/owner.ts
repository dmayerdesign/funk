import { UserRole } from "@funk/auth/domain/user-role"
import sendEmailToOwner from "@funk/contact/application/internal/behaviors/send-email-to-owner"
import { ContactForm } from "@funk/contact/domain/contact-form"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.PUBLIC,
    UserRole.ANONYMOUS,
  ]),
  async ({ body }: RequestWithBody<ContactForm>): Promise<void> =>
    await sendEmailToOwner(body),
)
