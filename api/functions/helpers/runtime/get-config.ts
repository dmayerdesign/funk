import { config } from "firebase-functions"

export interface AdminConfig {
  // TODO: Figure out if this supports camelCase.
  serializedcredentials: string
}

export interface FunctionsConfig {
  admin: AdminConfig
}

export const createGetConfigStub = () => () =>
  ({
    admin: {
      serializedcredentials: Buffer.from(
        JSON.stringify({
          client_email: "client email",
          private_key: "private key",
        })
      ).toString("base64"),
    },
  } as FunctionsConfig)

export default function (): FunctionsConfig {
  return config() as FunctionsConfig
}
