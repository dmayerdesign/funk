import * as cors from 'cors'
import * as express from 'express'
import { createApp } from './create-app'

export function createCorsApp(
  origin: string | RegExp | string[] | RegExp[] | boolean,
  app?: express.Application
): express.Application {
  const corsApp = app || createApp()
  corsApp.use(cors({ origin }))
  return corsApp
}
