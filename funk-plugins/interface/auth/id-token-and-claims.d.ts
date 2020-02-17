import { CustomClaims } from "@funk/model/auth/custom-claims";

export interface IdTokenAndClaims
{
  token: string
  claims: CustomClaims
}
