import { TRUSTED_ORIGINS } from '@funk/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import handleError from './handle-error'

export interface CreateAppOptions
{
  corsOptions?: cors.CorsOptions
}

export const construct = (app = express()) =>
{
  return function({ corsOptions }: CreateAppOptions = {}): express.Application
  {
    return app.use(
      cookieParser(),
      handleError,
      cors({
        origin: TRUSTED_ORIGINS.split(','),
        ...corsOptions,
      }),
    )
  }
}

export default construct()
