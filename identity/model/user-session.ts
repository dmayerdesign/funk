import { Auth } from "@funk/identity/model/auth"
import { Person } from "@funk/identity/person/model/person"

export interface UserSession {
  person: Person
  auth: Auth
}
