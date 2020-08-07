import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { ContactForm } from "@funk/model/contact/contact-form"

const functionName = "contactOwner"
type PayloadType = ContactForm
type ResolvedValueType = void

export function construct(client: FunctionsClient)
{
  return async function(payload: PayloadType): Promise<ResolvedValueType>
  {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(functionName, payload)
  }
}

export type ContactOwner = ReturnType<typeof construct>
