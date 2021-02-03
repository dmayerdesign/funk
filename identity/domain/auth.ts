import { CustomClaims } from "@funk/auth/domain/custom-claims"

export interface Auth {
  id: string
  token: string
  claims: CustomClaims
}
