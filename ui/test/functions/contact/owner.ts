import { ContactForm } from "@funk/model/contact/contact-form"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"

type PayloadType = ContactForm
type ResolvedValueType = void

export function construct(_client: FunctionsClient) {
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return undefined
  }
}

export type ContactOwner = ReturnType<typeof construct>
