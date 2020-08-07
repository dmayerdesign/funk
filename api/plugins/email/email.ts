type Sender = string | { name?: string; email: string }
type Recipient = string | { name?: string; email: string }

interface BaseEmailData {
  to: Recipient
  from: Sender
  subject: string
}

export type EmailData = BaseEmailData & (
  { text: string } | { html: string }
)
