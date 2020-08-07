import { DEFAULT_URL } from "@funk/ui/app/atlas/atlas"

export function construct()
{
  return async () => DEFAULT_URL
}

export type HomeRelativeUrl = ReturnType<typeof construct>
