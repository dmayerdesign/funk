import { Auth } from "@funk/identity/model/auth"
import { Person } from "@funk/identity/model/person"

export interface UserSession {
  person: Person
  auth: Auth
}
