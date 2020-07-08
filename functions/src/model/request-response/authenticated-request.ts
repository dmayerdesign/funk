import { DecodedIdToken } from "@funk/api/plugins/auth/decoded-id-token"
import { Request } from "express"

export interface AuthenticatedRequest extends Readonly<Request>
{
  user: Readonly<DecodedIdToken>
}
