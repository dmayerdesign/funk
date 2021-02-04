import { ContactForm } from "@funk/contact/model/contact-form"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

type PayloadType = ContactForm
type ResolvedValueType = void

export function construct(_client: FunctionsClient) {
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return undefined
  }
}

export type ContactOwner = ReturnType<typeof construct>
