import { Request } from 'express'
import { auth } from 'firebase-admin'

export interface AuthenticatedRequest extends Request {
  user?: auth.DecodedIdToken
}
