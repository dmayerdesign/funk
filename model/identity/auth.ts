import { CustomClaims } from "@funk/model/auth/custom-claims"

export interface Auth {
  id: string
  token: string
  claims: CustomClaims
}
