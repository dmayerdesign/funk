import { Request } from 'express'
import { auth } from 'firebase-admin'
import { IncomingHttpHeaders } from 'http'

export interface AuthenticationRequest extends Request
{
  user?: auth.DecodedIdToken
  cookies: {
    __session?: string;
  }
  headers: IncomingHttpHeaders
}
