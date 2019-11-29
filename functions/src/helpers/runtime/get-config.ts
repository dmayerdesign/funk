import { config } from 'firebase-functions'

export interface AdminConfig {
  serializedcredentials: string
}

export interface FunctionsConfig {
  admin: AdminConfig
}

export default function(): FunctionsConfig
{
  return config() as FunctionsConfig
}
