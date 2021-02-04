import { ContactForm } from "@funk/contact/model/contact-form"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "contactOwner"
type PayloadType = ContactForm
type ResolvedValueType = void

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}

export type ContactOwner = ReturnType<typeof construct>
