import { GetIsHuman } from "@funk/auth/plugins/internal/turing-test/behaviors/get-is-human"
import { OWNER_EMAIL } from "@funk/configuration"
import { construct } from "@funk/contact/application/internal/behaviors/send-email-to-owner"
import { ContactForm } from "@funk/contact/domain/contact-form"
import { Send } from "@funk/contact/plugins/internal/email/behaviors/send"

describe("sendEmailToOwner", () => {
  let sendEmail: Send
  let getIsHuman: GetIsHuman
  let sendEmailToOwner: ReturnType<typeof construct>

  beforeEach(() => {
    sendEmail = jest.fn().mockImplementation(() => Promise.resolve())
    getIsHuman = jest.fn().mockResolvedValue(true)
    sendEmailToOwner = construct(sendEmail, getIsHuman)
  })

  it("should send an email to the site owner", async function () {
    const EMAIL: ContactForm = {
      name: "name",
      emailAddress: "email address",
      message: "message",
      turingTestToken: "turing test token",
    }

    await sendEmailToOwner(EMAIL)

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: OWNER_EMAIL,
        text: expect.stringContaining(EMAIL.message),
      }),
    )
  })
})
