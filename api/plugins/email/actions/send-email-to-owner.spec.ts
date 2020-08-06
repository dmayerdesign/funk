import { EmailToOwner } from "@funk/api/plugins/email/email-to-owner"
import { construct } from "@funk/api/plugins/email/actions/send-email-to-owner"
import getSecretImpl from "@funk/api/plugins/secrets/actions/get-secret"
import { OWNER_EMAIL } from "@funk/config"

describe("sendEmailToOwner", () =>
{
  const EMAIL_CLIENT_SECRET = "email client secret"
  let getSecret: typeof getSecretImpl
  let emailClient: any
  let sendEmailToOwner: ReturnType<typeof construct>

  beforeEach(() =>
  {
    getSecret = jest.fn().mockResolvedValue(EMAIL_CLIENT_SECRET)
    emailClient = {
      setApiKey: jest.fn(),
      send: jest.fn().mockImplementation(() => Promise.resolve()),
    }
    sendEmailToOwner = construct(emailClient, getSecret)
  })

  it("should send an email to the site owner", async () =>
  {
    const EMAIL: EmailToOwner = {
      name: "name",
      emailAddress: "email address",
      message: "message",
    }

    await sendEmailToOwner(EMAIL)

    expect(emailClient.setApiKey).toHaveBeenLastCalledWith(EMAIL_CLIENT_SECRET)
    expect(emailClient.send).toHaveBeenCalledWith(expect.objectContaining({
      to: OWNER_EMAIL,
      text: expect.stringContaining(EMAIL.message),
    }))
  })
})
