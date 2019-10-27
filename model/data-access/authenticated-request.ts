import { Request } from 'express'
import { auth } from 'firebase-admin'

export interface AuthenticatedRequest extends Readonly<Request> {
  user: Readonly<auth.DecodedIdToken>
}
