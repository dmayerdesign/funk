import { DecodedIdToken } from '@funk/plugins/auth/decoded-id-token'
import { Request } from 'express'
import { IncomingHttpHeaders } from 'http'

export interface AuthenticationRequest extends Request
{
  user?: DecodedIdToken
  cookies: {
    __session?: string;
  }
  headers: IncomingHttpHeaders
}
