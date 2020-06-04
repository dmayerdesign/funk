import { Auth } from "@funk/model/identity/auth"
import { Person } from "@funk/model/identity/person"

export interface UserSession {
  person: Person
  auth: Auth
}
