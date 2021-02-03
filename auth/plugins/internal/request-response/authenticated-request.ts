import { DecodedIdToken } from "@funk/auth/plugins/internal/decoded-id-token"
import { Request } from "express"

export interface AuthenticatedRequest extends Readonly<Request> {
  user: Readonly<DecodedIdToken>
}
