import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import handleError from './handle-error'

export interface CreateAppOptions {
  corsOptions?: cors.CorsOptions
}

export default function({ corsOptions }: CreateAppOptions = {}): express.Application {
  return express().use(
    cookieParser(),
    handleError,
    cors({ origin: '*', ...corsOptions }),
  )
}
