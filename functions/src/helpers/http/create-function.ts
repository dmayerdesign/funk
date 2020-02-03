import { Application } from 'express'
import { https, HttpsFunction } from 'firebase-functions'

export const construct = () =>
  {
    return function(app: Application): HttpsFunction
    {
      return https.onRequest(app)
    }
  }

export default construct()
