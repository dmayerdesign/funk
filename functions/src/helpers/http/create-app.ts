import { TRUSTED_ORIGINS } from '@funk/config'
import handleError from '@funk/functions/helpers/http/handle-error'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

export interface CreateAppOptions
{
  corsOptions?: cors.CorsOptions
}

export const construct = (appFactory = () => express()) =>
{
  return function({ corsOptions }: CreateAppOptions = {}): express.Application
  {
    return appFactory().use(
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
