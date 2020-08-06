import { EmailToOwner } from "@funk/api/plugins/email/email-to-owner"
import getSecretImpl from "@funk/api/plugins/secrets/actions/get-secret"
import { EMAIL_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"
import { OWNER_EMAIL } from "@funk/config"
import emailClientImpl from "@sendgrid/mail"

export function construct(
  emailClient = emailClientImpl,
  getSecret = getSecretImpl
)
{
  return async function({ name, emailAddress, message }: EmailToOwner): Promise<void>
  {
    const API_KEY = await getSecret(EMAIL_SERVICE_PROVIDER_SECRET_KEY)
    emailClient.setApiKey(API_KEY!)
    await emailClient.send({
      to: OWNER_EMAIL,
      from: {
        name: `${name} (via the contact form)`,
        email: emailAddress,
      },
      subject: `${name} submitted the contact form and is probably not a robot`,
      text: render({ name, emailAddress, message }),
    })
  }
}

function render({ name, message }: EmailToOwner): string
{
  return `
From: ${name}

Message:

${message}
  `
}
