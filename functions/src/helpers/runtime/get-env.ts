export interface FunctionsEnvironment {
  GCLOUD_PROJECT: string
  FIREBASE_CONFIG: string
}

export default function(): FunctionsEnvironment
{
  return process.env as unknown as FunctionsEnvironment
}
