import { EmailData } from "@funk/contact/model/email"
import getSecretImpl from "@funk/secrets/plugins/internal/encrypted-storage/behaviors/get-secret"
import { EMAIL_SERVICE_PROVIDER_SECRET_KEY } from "@funk/secrets/plugins/internal/encrypted-storage/keys"
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
