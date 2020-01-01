import { DecodedIdToken } from '@funk/plugins/auth/decoded-id-token'
import { Request } from 'express'

export interface AuthenticatedRequest extends Readonly<Request>
{
  user: Readonly<DecodedIdToken>
}
