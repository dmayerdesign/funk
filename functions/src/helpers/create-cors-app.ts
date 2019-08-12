import * as cors from 'cors'
import * as express from 'express'

export function createCorsApp(
  origin: string | RegExp | string[] | RegExp[] | boolean,
  app?: express.Application
): express.Application {
  const corsApp = app || express()
  corsApp.use(cors({ origin }))
  return corsApp
}
