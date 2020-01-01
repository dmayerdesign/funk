export interface IdTokenAndClaims
{
  token: string
  claims: {
    [key: string]: any
  }
}
