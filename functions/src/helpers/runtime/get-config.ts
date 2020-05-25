import { config } from "firebase-functions"

export interface AdminConfig
{
  // TODO: Figure out if this supports camelCase.
  serializedcredentials: string
}

export interface FunctionsConfig
{
  admin: AdminConfig
}

export default function(): FunctionsConfig
{
  return config() as FunctionsConfig
}
