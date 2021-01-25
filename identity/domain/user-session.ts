import { Auth } from "@funk/identity/domain/auth"
import { Person } from "@funk/identity/domain/person"

export interface UserSession {
  person: Person
  auth: Auth
}
