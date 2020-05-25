import { auth } from "firebase-functions"
import { UserBuilder } from "firebase-functions/lib/providers/auth"

export function authEvents(): { user(): UserBuilder }
{
  return auth
}
