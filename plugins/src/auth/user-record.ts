export interface UserRecord
{
  uid: string
  email?: string
  emailVerified: boolean
  displayName?: string
  phoneNumber?: string
  photoURL?: string
  disabled: boolean
  metadata: {
    lastSignInTime: string
    creationTime: string
  }
  /**
   * An array of providers (for example, Google, Facebook) linked to the user.
   */
  providerData: {
    uid: string
    displayName: string
    email: string
    phoneNumber: string
    photoURL: string
    providerId: "google.com"|"facebook.com"|string
    toJSON(): object
  }[]
  customClaims?: { [key: string]: any }
  toJSON(): object
}
