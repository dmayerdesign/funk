import { DecodedIdToken } from "@funk/auth/plugins/internal/decoded-id-token"
import { Request } from "express"
import { IncomingHttpHeaders } from "http"

export interface AuthenticationRequest extends Request {
  user?: DecodedIdToken
  cookies: {
    __session?: string
  }
  headers: IncomingHttpHeaders
}
