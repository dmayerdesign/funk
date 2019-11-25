import { TRUSTED_ORIGINS } from '@funk/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import handleError from './handle-error'

export interface CreateAppOptions
{
  corsOptions?: cors.CorsOptions
}

export default function({ corsOptions }: CreateAppOptions = {}): express.Application
{
  return express().use(
    cookieParser(),
    handleError,
    cors({
      origin: TRUSTED_ORIGINS.split(','),
      ...corsOptions,
    }),
  )
}
