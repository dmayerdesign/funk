import getSecretImpl from "@funk/admin/plugins/internal/secrets/behaviors/get-secret"
import { EMAIL_SERVICE_PROVIDER_SECRET_KEY } from "@funk/admin/plugins/internal/secrets/keys"
import { EmailData } from "@funk/contact/application/internal/email"
import emailClientImpl from "@sendgrid/mail"

export function construct(
  emailClient: typeof emailClientImpl,
  getSecret: typeof getSecretImpl,
) {
  return async function (emailData: EmailData): Promise<void> {
    const API_KEY = await getSecret(EMAIL_SERVICE_PROVIDER_SECRET_KEY)
    emailClient.setApiKey(API_KEY!)
    await emailClient.send(emailData)
  }
}

export default construct(emailClientImpl, getSecretImpl)

export type Send = ReturnType<typeof construct>
