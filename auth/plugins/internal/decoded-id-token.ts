import { auth } from "firebase-admin"

export interface DecodedIdToken
  extends Omit<auth.DecodedIdToken, "aud">,
    Omit<auth.DecodedIdToken, "firebase"> {}
