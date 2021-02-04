import { NotImplementedError } from "@funk/error/model/not-implemented-error"

export function construct(_store: any): never {
  throw new NotImplementedError(
    "`deleteById` is not implemented in the Google Cloud Firestore persistence UI plugin.",
  )
}

export type DeleteById = ReturnType<typeof construct>
