import { CustomClaims } from "@funk/auth/model/custom-claims"

export interface Auth {
  id: string
  token: string
  claims: CustomClaims
}
