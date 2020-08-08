import { construct } from "@funk/api/contact/behaviors/send-email-to-owner"
import { Send } from "@funk/api/plugins/email/behaviors/send"
import { OWNER_EMAIL } from "@funk/config"
import { ContactForm } from "@funk/model/contact/contact-form"

describe("sendEmailToOwner", () =>
{
  let sendEmail: Send
  let sendEmailToOwner: ReturnType<typeof construct>

  beforeEach(() =>
  {
    sendEmail = jest.fn().mockImplementation(() => Promise.resolve())
    sendEmailToOwner = construct(sendEmail)
  })

  it("should send an email to the site owner", async () =>
  {
    const EMAIL: ContactForm = {
      name: "name",
      emailAddress: "email address",
      message: "message",
      turingTestToken: "turing test token",
    }

    await sendEmailToOwner(EMAIL)

    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: OWNER_EMAIL,
      text: expect.stringContaining(EMAIL.message),
    }))
  })
})
