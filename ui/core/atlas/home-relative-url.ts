import { HOMEPAGE } from "@funk/configuration"

export function construct()
{
  return async () => HOMEPAGE
}

export type HomeRelativeUrl = ReturnType<typeof construct>
